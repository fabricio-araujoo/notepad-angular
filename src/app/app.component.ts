import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TagsService } from './core/services/tagsService/tags.service';
import { Tag } from './core/entities/Tag';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CoreModule } from './core/core.module';
import { IconAdapterService } from './core/adapter/iconAdapter/icon-adapter.service';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoreModule,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  providers: [IconAdapterService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-notepad';

  tags!: Tag[];

  isSidebarCollapse: boolean = false;

  constructor(
    private iconService: IconAdapterService,
    private tagsService: TagsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tagsService.getTagList().subscribe((data) => {
      this.tags = data;
    });
  }

  collaseSidebar() {
    this.isSidebarCollapse = !this.isSidebarCollapse;
    this.cdr.detectChanges(); // Força a detecção de alteração no 'isSidebarCollapse'
  }
}
