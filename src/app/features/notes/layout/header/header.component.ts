import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '~/app/core/services/auth/auth.service';
import { ProfileStore } from '~/app/core/stores/profile/profile.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, ButtonComponent, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() collapse = new EventEmitter<void>();

  username: string = '';

  constructor(
    private authService: AuthService,
    private profileStore: ProfileStore
  ) {}

  ngOnInit(): void {
    const profile = this.profileStore.profile();
    console.log(profile);

    this.username = profile?.name || '';
  }

  handleClick() {
    this.collapse.emit();
  }

  handleSignOut() {
    this.authService.signOut();
  }
}
