import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { INotificationAdapter } from '../notification-adapter/notification-adapter.interface';
import { NotificationAdapterService } from '../notification-adapter/notification-adapter.service';
import {
  IDefaultResponse,
  IHttpAdapter,
  IHttpServiceBody,
  IHttpServiceOptions,
  IHttpServiceQueryParams,
} from './http-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpAdapterService implements IHttpAdapter {
  private http: HttpClient = inject(HttpClient);
  private notification: INotificationAdapter = inject(
    NotificationAdapterService
  );

  private readonly baseUrl: string = 'http://localhost:3000';

  private buildUrl(url: string) {
    return this.baseUrl + url;
  }

  get<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.get<T>(this.buildUrl(url), {
        ...options,
        params: { ...queryParams },
        observe: 'response' as const,
      })
    );
  }

  post<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.post<T>(this.buildUrl(url), body, {
        ...options,
        observe: 'response' as const,
      })
    );
  }

  put<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.put<T>(this.buildUrl(url), body, {
        ...options,
        observe: 'response' as const,
      })
    );
  }

  delete<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.delete<T>(this.buildUrl(url), {
        ...options,
        params: { ...queryParams },
        observe: 'response' as const,
      })
    );
  }

  hasError<T>(request: HttpResponse<IDefaultResponse<T>>): boolean {
    if (!request.body) {
      return true;
    }

    const SUCCESS_CODE = [
      HttpStatusCode.Ok,
      HttpStatusCode.Created,
      HttpStatusCode.NoContent,
    ];

    const error =
      request.body.code && !SUCCESS_CODE.includes(request.body.code);

    if (error) {
      return true;
    }

    return false;
  }

  handleError(err?: string): void {
    this.notification.error({
      title: 'Erro',
      message: err || 'Ocorreu um erro inesperado',
    });
  }
}
