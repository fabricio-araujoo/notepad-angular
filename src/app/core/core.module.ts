import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpAdapterService } from './adapter/http-adapter/http-adapter.service';
import { NotificationAdapterService } from './adapter/notification-adapter/notification-adapter.service';
import { RouterAdapterService } from './adapter/router-adapter/router-adapter.service';
import { LocalStoragePlugin } from './plugins/local-storage/local-storage.plugin';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { LoadingStore } from './stores/loading/loading.store';
import { ProfileStore } from './stores/profile/profile.store';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Adapters
    HttpAdapterService,
    RouterAdapterService,
    NotificationAdapterService,

    // Services
    AuthService,
    UserService,

    // Plugins
    LocalStoragePlugin,

    // Store
    LoadingStore,
    ProfileStore,
  ],
})
export class CoreModule {}
