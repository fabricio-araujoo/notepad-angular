import { TestBed } from '@angular/core/testing';

import { IconAdapterService } from './icon-adapter.service';

describe('IconAdapterService', () => {
  let service: IconAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
