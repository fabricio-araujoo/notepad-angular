import { TestBed } from '@angular/core/testing';

import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });

    service = TestBed.inject(LocalStorageService);
  });

  it('should get a value from localStorage', () => {
    const key = ELocalStorageKeys.CURRENT_USER;

    spyOn(localStorage, 'getItem').and.returnValue('mock-user');

    const result = service.get(key);

    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBe('mock-user');
  });

  it('should set a value in localStorage', () => {
    const key = ELocalStorageKeys.CURRENT_USER;

    spyOn(localStorage, 'setItem');

    service.set(key, 123);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, '123');
  });

  it('should remove a value from localStorage', () => {
    const key = ELocalStorageKeys.CURRENT_USER;

    spyOn(localStorage, 'removeItem');

    service.remove(key);

    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });
});
