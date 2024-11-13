import { HttpEvent } from '@angular/common/http';

export interface IHttpService {
  get<T>(url: string, options?: any): Promise<HttpEvent<T>>;
  post<T>(url: string, body: any, options?: any): Promise<HttpEvent<T>>;
  put<T>(url: string, body: any, options?: any): Promise<HttpEvent<T>>;
  delete<T>(url: string, options?: any): Promise<HttpEvent<T>>;
}
