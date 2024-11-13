import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterAdapterService } from '../../adapter/router-adapter/router-adapter.service';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: RouterAdapterService) {}

  canActivate(): boolean {
    const token = localStorage.getItem(ELocalStorageKeys.access_token);

    if (!token) {
      this.router.navigate('/sign-in');

      return false;
    }
    return true;
  }
}
