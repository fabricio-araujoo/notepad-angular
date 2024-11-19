import { HttpEvent } from '@angular/common/http';

export interface IHttpService {
  get<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpEvent<T>>;
  post<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpEvent<T>>;
  put<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpEvent<T>>;
  delete<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpEvent<T>>;
}

export type IHttpServiceQueryParams = Record<string, any>;

export type IHttpServiceBody = Record<string, any>;

export type IHttpServiceOptions = Record<string, any>;

export type IDefaultResponse<T> = {
  code: number;
  error?: string;
  result?: T;
};
