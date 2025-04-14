import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '~/app/core/services/auth/auth.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileService } from '~/app/core/stores/profile/profile.service';

@Component({
    selector: 'app-header',
    imports: [MatIconModule, ButtonComponent, MatTooltipModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() collapse = new EventEmitter<void>();

  username: string = '';

  constructor(
    private authService: AuthService,
    private profileStore: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileStore.profile$.subscribe((profile) => {
      this.username = profile?.name || '';
    });
  }

  handleClick() {
    this.collapse.emit();
  }

  handleSignOut() {
    this.authService.signOut();
  }
}
