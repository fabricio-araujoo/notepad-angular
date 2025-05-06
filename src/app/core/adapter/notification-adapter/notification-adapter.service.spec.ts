import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { NotificationAdapterService } from './notification-adapter.service';

describe('NotificationAdapterService', () => {
  let service: NotificationAdapterService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add', 'clear']);

    TestBed.configureTestingModule({
      providers: [
        NotificationAdapterService,
        { provide: MessageService, useValue: spy },
      ],
    });

    service = TestBed.inject(NotificationAdapterService);
    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
  });

  it('should show success notification', () => {
    service.success({ title: 'Success', message: 'It worked' });

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'It worked',
      life: 3000,
    });
  });

  it('should show error notification', () => {
    service.error({ title: 'Error', message: 'Something went wrong' });

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
      life: 3000,
    });
  });

  it('should show info notification', () => {
    service.info({ title: 'Info', message: 'FYI' });

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Info',
      detail: 'FYI',
      life: 3000,
    });
  });

  it('should show warning notification', () => {
    service.warning({ title: 'Warning', message: 'Be careful' });

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Be careful',
      life: 3000,
    });
  });

  it('should clear notifications', () => {
    service.clear();

    expect(messageServiceSpy.clear).toHaveBeenCalled();
  });
});
