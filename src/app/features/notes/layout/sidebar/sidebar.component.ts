import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';
import { ITag } from '~/app/shared/interfaces/tag';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, RouterLink, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Input() collapse: boolean = false;
  @Input() tags: ITag[] = [];

  currentRoute!: string;

  constructor(private routeService: RouterAdapterService) {}

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  private getCurrentRoute() {
    this.routeService.currentRoute$.subscribe((route) => {
      this.currentRoute = route;
    });
  }

  hasTags() {
    return this.tags && this.tags.length;
  }
}
