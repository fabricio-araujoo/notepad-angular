import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { LocalStoragePlugin } from '../../plugins/local-storage/local-storage.plugin';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage: LocalStoragePlugin = inject(LocalStoragePlugin);

  const accessToken = localStorage.get(ELocalStorageKeys.ACCESS_TOKEN);

  if (!accessToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${accessToken}`),
  });

  return next(newReq);
};
