import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagsService } from './services/tagsService/tags.service';
import { HttpAdapterService } from './adapter/httpAdapter/http-adapter.service';
import { RouterAdapterService } from './adapter/routerAdapter/router-adapter.service';

const adapters = [HttpAdapterService, RouterAdapterService];

const services = [TagsService];

@NgModule({
  imports: [CommonModule],
  providers: [...adapters, ...services], // Note que isso pode ser opcional se já estiver no providedIn: 'root'
})
export class CoreModule {}
