import { Component, effect, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '~/app/core/services/auth/auth.service';
import { ProfileStore } from '~/app/core/stores/profile/profile.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, ButtonComponent, MatTooltipModule, TooltipComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() collapsed = new EventEmitter<void>();

  username: string = '';

  constructor(
    private authService: AuthService,
    private profileStore: ProfileStore
  ) {
    effect(() => {
      const profile = this.profileStore.profile();

      this.username = profile?.name || '';
    });
  }

  onClick() {
    this.collapsed.emit();
  }

  onSignOut() {
    this.authService.signOut();
  }
}
