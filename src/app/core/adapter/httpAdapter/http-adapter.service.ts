import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceGet } from './types';
import { buildQueryParams } from './http-adapter.builder';

@Injectable({
  providedIn: 'root',
})
export class HttpAdapterService {
  readonly baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get<T>(params: HttpServiceGet): Observable<T> {
    const queryParams = buildQueryParams(params.queryParams);

    return this.http.get<T>(`${this.baseUrl}${params.url}`, {
      params: queryParams,
      ...params.config,
    });
  }
}
