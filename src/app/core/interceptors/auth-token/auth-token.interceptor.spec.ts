import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../../adapter/local-storage/local-storage.service';
import { authTokenInterceptor } from './auth-token.interceptor';

describe('authTokenInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'get',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageSpy },
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization in header if token exists', () => {
    localStorageService.get.and.returnValue('fake-token');

    http.get('/test-endpoint').subscribe();

    const req = httpMock.expectOne('/test-endpoint');

    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush({});
  });

  it('shouldnt add Authorization in header if token no exists', () => {
    localStorageService.get.and.returnValue(null);

    http.get('/test-endpoint').subscribe();

    const req = httpMock.expectOne('/test-endpoint');

    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({});
  });
});
