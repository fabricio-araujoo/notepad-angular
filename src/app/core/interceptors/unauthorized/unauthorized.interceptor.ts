import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { IRouterAdapter } from '../../adapter/router-adapter/router-adapter.interface';
import { RouterAdapterService } from '../../adapter/router-adapter/router-adapter.service';
import { LocalStoragePlugin } from '../../plugins/local-storage/local-storage.plugin';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router: IRouterAdapter = inject(RouterAdapterService);
  const localStorage: LocalStoragePlugin = inject(LocalStoragePlugin);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.remove(ELocalStorageKeys.ACCESS_TOKEN);
        router.navigate('/sign-in');
      }

      return throwError(() => error);
    })
  );
};
