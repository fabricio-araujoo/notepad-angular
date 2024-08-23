import { HttpParams } from '@angular/common/http';
import { HttpServiceGet } from './types';

export const buildQueryParams = (
  queryParams: HttpServiceGet['queryParams'] = {}
): HttpParams => {
  let params = new HttpParams();

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];

    params = params.set(key, String(value));
  });

  return params;
};
