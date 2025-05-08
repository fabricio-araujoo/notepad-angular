import { Component, inject, Input } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { IRouterAdapter } from '~/app/core/adapter/router-adapter/router-adapter.interface';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';

export type IBreadcrumbItem = {
  label: string;
  path: string;
};

@Component({
  selector: 'app-breadcrumb',
  imports: [Breadcrumb],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  private router: IRouterAdapter = inject(RouterAdapterService);

  @Input() items: IBreadcrumbItem[] = [];

  handleClick(item: IBreadcrumbItem) {
    this.router.navigate(item.path);
  }
}
