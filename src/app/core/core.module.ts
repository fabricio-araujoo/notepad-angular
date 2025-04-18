import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpAdapterService } from './adapter/http-adapter/http-adapter.service';
import { LocalStorageService } from './adapter/local-storage/local-storage.service';
import { NotificationAdapterService } from './adapter/notification-adapter/notification-adapter.service';
import { RouterAdapterService } from './adapter/router-adapter/router-adapter.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { LoadingStore } from './stores/loading/loading.service';
import { ProfileStore } from './stores/profile/profile.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Adapters
    HttpAdapterService,
    LocalStorageService,
    RouterAdapterService,
    NotificationAdapterService,

    // Services
    AuthService,
    UserService,

    // Store
    LoadingStore,
    ProfileStore,
  ],
})
export class CoreModule {}
