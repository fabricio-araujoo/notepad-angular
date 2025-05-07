import { HttpResponse } from '@angular/common/http';

export interface IHttpAdapter {
  get<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>>;
  post<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>>;
  put<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>>;
  delete<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>>;
  hasError<T>(request: HttpResponse<IDefaultResponse<T>>): boolean;
  handleError<T>(request: HttpResponse<IDefaultResponse<T>>): void;
}

export type IHttpServiceQueryParams = Record<string, any>;

export type IHttpServiceBody = Record<string, any>;

export type IHttpServiceOptions = Record<string, any>;

export type IDefaultResponse<T> = {
  code: number;
  error?: string;
  result?: T;
};
