import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { IconService } from './components/icon/icon.service';
import { TagsService } from './services/tagsService/tags.service';
import { Tag } from './types/Tag';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, SidebarComponent, HeaderComponent],
  providers: [IconService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-notepad';

  tags!: Tag[];

  isSidebarCollapse: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private iconService: IconService,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
    this.tagsService.getTagList().subscribe((data) => {
      this.tags = data;
    });
  }

  collaseSidebar() {
    console.log('collaseSidebar');
    console.log({ isSidebarCollapse: this.isSidebarCollapse });

    this.isSidebarCollapse = !this.isSidebarCollapse;
    this.cdr.detectChanges(); // Força a detecção de alteração no 'isSidebarCollapse'
  }
}
