import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { IRouterAdapter } from '../../adapter/router-adapter/router-adapter.interface';
import { RouterAdapterService } from '../../adapter/router-adapter/router-adapter.service';

export const authGuard: CanActivateFn = () => {
  const router: IRouterAdapter = inject(RouterAdapterService);

  const token = localStorage.getItem(ELocalStorageKeys.ACCESS_TOKEN);

  if (!token) {
    router.navigate('/sign-in');

    return false;
  }

  return true;
};
