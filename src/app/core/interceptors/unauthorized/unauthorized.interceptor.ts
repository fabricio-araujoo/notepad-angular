import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { LocalStorageService } from '../../adapter/local-storage/local-storage.service';
import { RouterAdapterService } from '../../adapter/router-adapter/router-adapter.service';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(RouterAdapterService);
  const localStorageService = inject(LocalStorageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorageService.remove(ELocalStorageKeys.ACCESS_TOKEN);
        router.navigate('/sign-in');
      }

      return throwError(() => error);
    })
  );
};
