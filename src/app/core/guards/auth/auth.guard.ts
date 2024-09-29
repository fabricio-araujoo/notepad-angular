import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../adapter/local-storage/local-storage.service';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';

export const authGuard: CanActivateFn = (route, state) => {
  console.log({ route, state });

  const router: Router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const access_token = localStorageService.get(ELocalStorageKeys.access_token);

  return Boolean(access_token) || router.navigate(['sign-in']);
};
