import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { LocalStorageService } from '../../adapter/local-storage/local-storage.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(LocalStorageService).get(
    ELocalStorageKeys.ACCESS_TOKEN
  );

  if (!accessToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${accessToken}`),
  });

  return next(newReq);
};
