import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { IRouterAdapter } from '~/app/core/adapter/router-adapter/router-adapter.interface';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';
import { AuthService } from '~/app/features/auth/services/auth/auth.service';
import { IconComponent } from '~/app/shared/components/icon/icon.component';
import { ProfileStore } from '~/app/shared/stores/profile/profile.store';

type INavigationItem = {
  label: string;
  icon: string;
  route: string;
  handleClick: VoidFunction;
}[];

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, IconComponent, Menu],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private router: IRouterAdapter = inject(RouterAdapterService);
  private authService: AuthService = inject(AuthService);
  private profileStore: ProfileStore = inject(ProfileStore);

  readonly email = signal<string>('');
  readonly username = signal<string>('');

  readonly navigationItems: INavigationItem = [
    {
      label: 'Notas',
      icon: 'note',
      route: '/note',
      handleClick: () => {
        this.handleNavigate('note');
      },
    },
    {
      label: 'Tarefas',
      icon: 'check-mark',
      route: '/task',
      handleClick: () => {
        this.handleNavigate('task');
      },
    },
  ];

  readonly userMenuItems: MenuItem[] = [
    {
      label: 'Sair',
      command: () => {
        this.handleSignOut();
      },
    },
  ];

  constructor() {
    effect(() => {
      const profile = this.profileStore.profile();

      this.email.set(profile?.email || '');
      this.username.set(profile?.name || '');
    });
  }

  handleSignOut() {
    this.authService.signOut();
  }

  handleNavigate(route: string) {
    this.router.navigate(route);
  }

  isCurrentRoute(route: string): boolean {
    return this.router.getCurrentRoute() === route;
  }
}
