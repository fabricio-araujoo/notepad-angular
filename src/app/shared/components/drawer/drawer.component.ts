import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule, MatIcon],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  @Input() title: string = '';
  @Input() width: string = '480px';

  opened: boolean = false;

  toogle() {
    this.opened = !this.opened;
  }
}
