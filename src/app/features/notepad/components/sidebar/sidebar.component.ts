import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { IRouterAdapter } from '~/app/core/adapter/router-adapter/router-adapter.interface';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';

import { ProfileStore } from '~/app/core/stores/profile/profile.store';
import { AuthService } from '~/app/features/auth/services/auth/auth.service';
import { IconComponent } from '~/app/shared/components/icon/icon.component';

type INavigationItem = {
  label: string;
  icon: string;
  route: string;
  handleClick: VoidFunction;
}[];

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private router: IRouterAdapter = inject(RouterAdapterService);
  private authService: AuthService = inject(AuthService);
  private profileStore: ProfileStore = inject(ProfileStore);

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

  constructor() {
    effect(() => {
      const profile = this.profileStore.profile();
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
