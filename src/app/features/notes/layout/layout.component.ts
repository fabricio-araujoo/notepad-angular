import { ChangeDetectorRef, Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ITag } from '~/app/shared/interfaces/tag';
import { LocalStorageService } from '~/app/core/adapter/local-storage/local-storage.service';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';

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

  collaseSidebar() {
    this.isSidebarCollapse = !this.isSidebarCollapse;

    this.localStorage.set(
      ELocalStorageKeys.SIDEBAR_COLLAPSE,
      this.isSidebarCollapse
    );

    this.cdr.detectChanges(); // Força a detecção de alteração no 'isSidebarCollapse'
  }
}
