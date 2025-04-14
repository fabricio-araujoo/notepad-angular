import { ChangeDetectorRef, Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ITag } from '~/app/shared/interfaces/tag';

@Component({
    selector: 'app-layout',
    imports: [HeaderComponent, SidebarComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  tags: ITag[] = [];

  isSidebarCollapse: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  collaseSidebar() {
    this.isSidebarCollapse = !this.isSidebarCollapse;
    this.cdr.detectChanges(); // Força a detecção de alteração no 'isSidebarCollapse'
  }
}
