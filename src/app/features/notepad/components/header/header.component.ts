import { Component } from '@angular/core';
import {
  BreadcrumbComponent,
  IBreadcrumbItem,
} from '../../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-header',
  imports: [BreadcrumbComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  breadcrumbItems: IBreadcrumbItem[] = [
    {
      label: 'Notepad',
      path: '',
    },
    {
      label: 'Notas',
      path: '/note',
    },
  ];
}
