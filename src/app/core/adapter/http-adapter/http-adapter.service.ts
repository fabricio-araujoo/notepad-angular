import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpServiceGet, IHttpServicePost } from './http-adapter.interface';
import { buildQueryParams } from './http-adapter.builder';

@Injectable({
  providedIn: 'root',
})
export class HttpAdapterService {
  readonly baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private buildUrl(url: string) {
    return this.baseUrl + url;
  }

  public get<T>(params: IHttpServiceGet): Observable<T> {
    const queryParams = buildQueryParams(params.queryParams);

    return this.http.get<T>(this.buildUrl(params.url), {
      params: queryParams,
      ...params.config,
    });
  }

  public post<T>(params: IHttpServicePost): Observable<T> {
    console.log('post');

    return this.http.post<T>(
      this.buildUrl(params.url),
      params.body,
      params.config
    );
  }
}
