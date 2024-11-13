import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../adapter/local-storage/local-storage.service';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(LocalStorageService).get(
    ELocalStorageKeys.access_token
  );

  if (!accessToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${accessToken}`),
  });

  return next(newReq);
};
