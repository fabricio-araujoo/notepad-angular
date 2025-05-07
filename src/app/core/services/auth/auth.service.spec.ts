import { TestBed } from '@angular/core/testing';

import {
  HttpResponse,
  HttpStatusCode,
  provideHttpClient,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { IDefaultResponse } from '../../adapter/http-adapter/http-adapter.interface';
import { HttpAdapterService } from '../../adapter/http-adapter/http-adapter.service';
import { NotificationAdapterService } from '../../adapter/notification-adapter/notification-adapter.service';
import { AuthService } from './auth.service';
import { ISignInParams, ISignInResponse } from './auth.service.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpAdapter: HttpAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        HttpAdapterService,
        NotificationAdapterService,
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AuthService);
    httpAdapter = TestBed.inject(HttpAdapterService);
  });

  it('should return token when is a valid response', async () => {
    const mockParams: ISignInParams = {
      email: 'test@test.com',
      password: '123456',
    };

    const mockSignInResponse: ISignInResponse = {
      access_token: '123456789',
    };

    const mockResponse: HttpResponse<IDefaultResponse<ISignInResponse>> = {
      body: { code: HttpStatusCode.Ok, result: mockSignInResponse },
    } as HttpResponse<IDefaultResponse<ISignInResponse>>;

    spyOn(httpAdapter, 'post').and.resolveTo(mockResponse);

    const result = await service.signIn(mockParams);

    expect(result).toEqual(mockSignInResponse);
    expect(httpAdapter.post).toHaveBeenCalledWith(
      '/v1/notepad/auth/sign-in',
      mockParams
    );
  });

  it('should return undefined when hasError is true', async () => {
    const mockParams: ISignInParams = {
      email: 'test@test.com',
      password: '123456',
    };

    const mockResponse: HttpResponse<IDefaultResponse<ISignInResponse>> = {
      body: { code: HttpStatusCode.BadRequest, result: undefined },
    } as HttpResponse<IDefaultResponse<ISignInResponse>>;

    spyOn(httpAdapter, 'post').and.resolveTo(mockResponse);

    const result = await service.signIn(mockParams);

    expect(result).toBeUndefined();
  });

  it('should return undefined to generic error', async () => {
    const mockParams: ISignInParams = {
      email: 'test@test.com',
      password: '123456',
    };

    spyOn(httpAdapter, 'post').and.rejectWith(new Error('Erro genérico'));

    const result = await service.signIn(mockParams);

    expect(result).toBeUndefined();
  });
});
