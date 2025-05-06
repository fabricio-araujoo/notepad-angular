import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type INotification = {
  title: string;
  message?: string;
  type: 'success' | 'error' | 'info' | 'warn';
};

@Injectable({
  providedIn: 'root',
})
export class NotificationAdapterService {
  private messageService = inject(MessageService);

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
