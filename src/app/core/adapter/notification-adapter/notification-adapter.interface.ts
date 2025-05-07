export interface INotificationAdapter {
  success(options: Omit<INotification, 'type'>): void;
  error(options: Omit<INotification, 'type'>): void;
  info(options: Omit<INotification, 'type'>): void;
  warning(options: Omit<INotification, 'type'>): void;
  clear(): void;
}

export type INotification = {
  title: string;
  message?: string;
  type: 'success' | 'error' | 'info' | 'warn';
};
