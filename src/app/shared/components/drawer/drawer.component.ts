import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonComponent } from '../button/button.component';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule, TooltipComponent, ButtonComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  @Input() title: string = '';
  @Input() width: string = '480px';

  @Output() closed = new EventEmitter<void>();

  opened = signal<boolean>(false);

  handleClose() {
    this.closed.emit();
  }

  toogle() {
    this.opened.set(!this.opened());

    if (!this.opened()) {
      this.handleClose();
    }
  }
}
