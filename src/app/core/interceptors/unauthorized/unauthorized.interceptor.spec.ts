import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { LocalStorageService } from '../../adapter/local-storage/local-storage.service';
import { RouterAdapterService } from '../../adapter/router-adapter/router-adapter.service';
import { unauthorizedInterceptor } from './unauthorized.interceptor';

describe('unauthorizedInterceptor (Angular 17+)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let routerAdapterService: jasmine.SpyObj<RouterAdapterService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'remove',
    ]);
    const routerSpy = jasmine.createSpyObj('RouterAdapterService', [
      'navigate',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: RouterAdapterService, useValue: routerSpy },
        provideHttpClient(withInterceptors([unauthorizedInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
    routerAdapterService = TestBed.inject(
      RouterAdapterService
    ) as jasmine.SpyObj<RouterAdapterService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should remove token and redirect if error 401', (done) => {
    http.get('/test-401').subscribe({
      next: () => fail('deveria ter falhado com erro 401'),
      error: (err: HttpErrorResponse) => {
        expect(err.status).toBe(401);
        expect(localStorageService.remove).toHaveBeenCalledWith(
          ELocalStorageKeys.ACCESS_TOKEN
        );
        expect(routerAdapterService.navigate).toHaveBeenCalledWith('/sign-in');
        done();
      },
    });

    const req = httpMock.expectOne('/test-401');

    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  it('shouldnt remove token and no redirect if another code', (done) => {
    http.get('/test-500').subscribe({
      next: () => fail('deveria ter falhado com erro 500'),
      error: (err: HttpErrorResponse) => {
        expect(err.status).toBe(500);
        expect(localStorageService.remove).not.toHaveBeenCalled();
        expect(routerAdapterService.navigate).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpMock.expectOne('/test-500');

    req.flush(
      { message: 'Erro interno' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
});
