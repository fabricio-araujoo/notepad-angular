import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpAdapterService } from './adapter/http-adapter/http-adapter.service';
import { RouterAdapterService } from './adapter/router-adapter/router-adapter.service';
import { IconAdapterService } from './adapter/icon-adapter/icon-adapter.service';
import { LocalStorageService } from './adapter/local-storage/local-storage.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { LoadingService } from './stores/loading/loading.service';
import { ProfileService } from './stores/profile/profile.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Adapters
    HttpAdapterService,
    IconAdapterService,
    LocalStorageService,
    RouterAdapterService,

    // Services
    AuthService,
    UserService,

    // Store
    LoadingService,
    ProfileService,
  ],
})
export class CoreModule {}
