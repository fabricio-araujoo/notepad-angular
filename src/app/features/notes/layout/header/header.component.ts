import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '~/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
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
