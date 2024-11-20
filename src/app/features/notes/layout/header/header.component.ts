import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '~/app/core/services/auth/auth.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, ButtonComponent, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() collapse = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  handleClick() {
    this.collapse.emit();
  }

  handleSignOut() {
    this.authService.signOut();
  }
}
