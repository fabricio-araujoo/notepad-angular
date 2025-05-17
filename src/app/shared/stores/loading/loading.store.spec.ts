import { TestBed } from '@angular/core/testing';

import { LoadingStore } from './loading.store';

describe('LoadingService', () => {
  let service: LoadingStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
