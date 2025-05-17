import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpAdapterService } from './adapter/http-adapter/http-adapter.service';
import { NotificationAdapterService } from './adapter/notification-adapter/notification-adapter.service';
import { RouterAdapterService } from './adapter/router-adapter/router-adapter.service';
import { LocalStoragePlugin } from './plugins/local-storage/local-storage.plugin';

import { LoadingStore } from '../shared/stores/loading/loading.store';
import { ProfileStore } from '../shared/stores/profile/profile.store';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Adapters
    HttpAdapterService,
    RouterAdapterService,
    NotificationAdapterService,

    // Plugins
    LocalStoragePlugin,

    // Store
    LoadingStore,
    ProfileStore,
  ],
})
export class CoreModule {}
