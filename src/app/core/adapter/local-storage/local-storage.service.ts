import { Injectable } from '@angular/core';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public get(key: ELocalStorageKeys) {
    return localStorage.getItem(key);
  }

  public set(key: ELocalStorageKeys, value: unknown) {
    return localStorage.setItem(key, `${value}`);
  }
}
