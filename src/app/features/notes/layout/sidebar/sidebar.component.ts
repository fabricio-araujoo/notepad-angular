import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '~/app/core/services/auth/auth.service';
import { ProfileStore } from '~/app/core/stores/profile/profile.store';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

type INavigationItem = {
  label: string;
  icon: string;
  route: string;
  handleClick: VoidFunction;
}[];

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private profileStore = inject(ProfileStore);

  readonly username = signal<string>('');

  readonly navigationItems: INavigationItem = [
    {
      label: 'Notas',
      icon: 'note',
      route: '/notes',
      handleClick() {
        console.log('Notas clicked');
      },
    },
    {
      label: 'Tarefas',
      icon: 'check-mark',
      route: '/tasks',
      handleClick() {
        console.log('Tarefas clicked');
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
}
