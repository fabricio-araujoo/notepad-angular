import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  INotification,
  INotificationAdapter,
} from './notification-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationAdapterService implements INotificationAdapter {
  private messageService: MessageService = inject(MessageService);

  private show(options: INotification) {
    this.messageService.add({
      severity: options.type,
      summary: options.title,
      detail: options.message,
      life: 3000,
    });
  }

  success(options: Omit<INotification, 'type'>) {
    this.show({ ...options, type: 'success' });
  }

  error(options: Omit<INotification, 'type'>) {
    this.show({ ...options, type: 'error' });
  }

  info(options: Omit<INotification, 'type'>) {
    this.show({ ...options, type: 'info' });
  }

  warning(options: Omit<INotification, 'type'>) {
    this.show({ ...options, type: 'warn' });
  }

  clear() {
    this.messageService.clear();
  }
}
