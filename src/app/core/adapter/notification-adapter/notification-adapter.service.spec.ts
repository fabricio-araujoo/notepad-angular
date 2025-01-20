import { TestBed } from '@angular/core/testing';

import { NotificationAdapterService } from './notification-adapter.service';

describe('NotificationAdapterService', () => {
  let service: NotificationAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
