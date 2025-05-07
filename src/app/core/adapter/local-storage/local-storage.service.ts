import { Injectable } from '@angular/core';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { ILocalStorageService } from './local-storage.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements ILocalStorageService {
  get(key: ELocalStorageKeys): string | null {
    return localStorage.getItem(key);
  }

  set(key: ELocalStorageKeys, value: unknown) {
    return localStorage.setItem(key, `${value}`);
  }

  remove(key: ELocalStorageKeys) {
    return localStorage.removeItem(key);
  }
}
