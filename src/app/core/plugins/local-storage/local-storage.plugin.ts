import { Injectable } from '@angular/core';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStoragePlugin {
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
