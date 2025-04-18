import { Component, effect, EventEmitter, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '~/app/core/services/auth/auth.service';
import { ProfileStore } from '~/app/core/stores/profile/profile.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, MatTooltipModule, TooltipComponent, IconComponent],
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

  handleClick() {
    this.collapsed.emit();
  }

  handleSignOut() {
    this.authService.signOut();
  }
}
