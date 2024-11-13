import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IHttpService } from './http-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpAdapterService implements IHttpService {
  readonly baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private buildUrl(url: string) {
    return this.baseUrl + url;
  }

  get<T>(
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.get<T>(this.buildUrl(url), {
        ...options,
        observe: 'response' as const,
      })
    );
  }

  post<T>(
    url: string,
    body: any,
    options?: { headers?: HttpHeaders; params?: HttpParams }
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
    body: any,
    options?: { headers?: HttpHeaders; params?: HttpParams }
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
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.delete<T>(this.buildUrl(url), {
        ...options,
        observe: 'response' as const,
      })
    );
  }
}
