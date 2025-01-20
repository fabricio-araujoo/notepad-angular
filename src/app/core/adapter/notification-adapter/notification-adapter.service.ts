import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationAdapterService {
  constructor(private toastr: ToastrService) {}

  private readonly defaultDuration = 3000;

  success(message: string, duration = this.defaultDuration) {
    this.toastr.success(message, undefined, { timeOut: duration });
  }

  error(message: string, duration = this.defaultDuration) {
    this.toastr.error(message, undefined, { timeOut: duration });
  }

  info(message: string, duration = this.defaultDuration) {
    console.log('info');
    this.toastr.info(message, undefined, { timeOut: duration });
  }

  warning(message: string, duration = this.defaultDuration) {
    this.toastr.warning(message, undefined, { timeOut: duration });
  }
}
