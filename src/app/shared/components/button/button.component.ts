import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type ButtonVariant = 'default' | 'primary';

type ButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant?: ButtonVariant = 'default'; // Define estilo
  @Input() type?: ButtonType = 'button';
  @Input() disabled?: boolean = false;
  @Input() block?: boolean = false; // Ocupar todo o espaço
}
