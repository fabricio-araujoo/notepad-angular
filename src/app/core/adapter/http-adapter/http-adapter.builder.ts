import { HttpParams } from '@angular/common/http';
import { IHttpServiceGet } from './http-adapter.interface';

export const buildQueryParams = (
  queryParams: IHttpServiceGet['queryParams'] = {}
): HttpParams => {
  let params = new HttpParams();

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];

    params = params.set(key, String(value));
  });

  return params;
};
