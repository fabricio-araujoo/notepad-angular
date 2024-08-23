import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Tag } from '~/app/types/Tag';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, MatIconModule, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  @Input() tags: Tag[] = [];
}
