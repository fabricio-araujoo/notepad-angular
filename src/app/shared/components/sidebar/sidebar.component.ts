import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RouterAdapterService } from '~/app/core/adapter/routerAdapter/router-adapter.service';
import { Tag } from '~/app/core/entities/Tag';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Input() collapse: boolean = false;

  @Input() tags: Tag[] = [];

  currentRoute!: string;

  constructor(private routeService: RouterAdapterService) {}

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  hasTags() {
    return this.tags && this.tags.length;
  }

  private getCurrentRoute() {
    this.routeService.currentRoute$.subscribe((route) => {
      this.currentRoute = route;
    });
  }
}
