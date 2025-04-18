import { ChangeDetectorRef, Component } from '@angular/core';
import { LocalStorageService } from '~/app/core/adapter/local-storage/local-storage.service';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { ITag } from '~/app/shared/interfaces/tag';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  tags: ITag[] = [];

  isSidebarCollapse: boolean = false;

  constructor(
    private localStorage: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) {
    this.isSidebarCollapse =
      this.localStorage.get(ELocalStorageKeys.SIDEBAR_COLLAPSE) === 'true';
  }

  handleCollaseSidebar() {
    this.isSidebarCollapse = !this.isSidebarCollapse;

    this.localStorage.set(
      ELocalStorageKeys.SIDEBAR_COLLAPSE,
      this.isSidebarCollapse
    );

    this.cdr.detectChanges(); // Força a detecção de alteração no 'isSidebarCollapse'
  }
}
