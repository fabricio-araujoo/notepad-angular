import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  IHttpService,
  IHttpServiceBody,
  IHttpServiceOptions,
  IHttpServiceQueryParams,
} from './http-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpAdapterService implements IHttpService {
  private http = inject(HttpClient);

  readonly baseUrl: string = 'http://localhost:3000';

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
}
