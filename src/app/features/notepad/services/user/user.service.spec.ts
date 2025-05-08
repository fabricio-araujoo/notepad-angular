import {
  HttpResponse,
  HttpStatusCode,
  provideHttpClient,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { IDefaultResponse } from '../../adapter/http-adapter/http-adapter.interface';
import { HttpAdapterService } from '../../adapter/http-adapter/http-adapter.service';
import { NotificationAdapterService } from '../../adapter/notification-adapter/notification-adapter.service';
import { UserService } from './user.service';
import { IGetCurrentUserReponse } from './user.service.interface';

describe('UserService', () => {
  let service: UserService;
  let httpAdapter: HttpAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        HttpAdapterService,
        NotificationAdapterService,
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(UserService);
    httpAdapter = TestBed.inject(HttpAdapterService);
  });

  it('should return the current user when is a valid response', async () => {
    const mockUser: IGetCurrentUserReponse = {
      profile: {
        id: '123',
        email: 'teste@exemplo.com',
        name: 'Usuário Teste',
        dateOfBirth: '1990-01-01',
      },
    };

    const mockResponse: HttpResponse<IDefaultResponse<IGetCurrentUserReponse>> =
      {
        body: { code: HttpStatusCode.Ok, result: mockUser },
      } as HttpResponse<IDefaultResponse<IGetCurrentUserReponse>>;

    spyOn(httpAdapter, 'get').and.resolveTo(mockResponse);

    const result = await service.getCurrentUser();

    expect(result).toEqual(mockUser);
    expect(httpAdapter.get).toHaveBeenCalledWith(
      '/v1/notepad/user/get-current'
    );
  });

  it('should return undefined when hasError is true', async () => {
    const mockResponse: HttpResponse<IDefaultResponse<IGetCurrentUserReponse>> =
      {
        body: { code: HttpStatusCode.BadRequest, result: undefined },
      } as HttpResponse<IDefaultResponse<IGetCurrentUserReponse>>;

    spyOn(httpAdapter, 'get').and.resolveTo(mockResponse);

    const result = await service.getCurrentUser();

    expect(result).toBeUndefined();
  });

  it('should return undefined to generic error', async () => {
    spyOn(httpAdapter, 'get').and.rejectWith(new Error('Erro genérico'));

    const result = await service.getCurrentUser();

    expect(result).toBeUndefined();
  });
});
