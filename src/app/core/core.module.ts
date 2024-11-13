import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpAdapterService } from './adapter/http-adapter/http-adapter.service';
import { RouterAdapterService } from './adapter/router-adapter/router-adapter.service';
import { IconAdapterService } from './adapter/icon-adapter/icon-adapter.service';
import { LocalStorageService } from './adapter/local-storage/local-storage.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    HttpAdapterService,
    IconAdapterService,
    LocalStorageService,
    RouterAdapterService,
    AuthService,
    UserService,
  ],
})
export class CoreModule {}
