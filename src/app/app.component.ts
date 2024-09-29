import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { IconAdapterService } from './core/adapter/icon-adapter/icon-adapter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-notepad';

  isSidebarCollapse: boolean = false;

  constructor(
    private iconService: IconAdapterService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    // this.tagsService.getTagList().subscribe((data) => {
    //   this.tags = data;
    // });
  }

  collaseSidebar() {
    this.isSidebarCollapse = !this.isSidebarCollapse;
    this.cdr.detectChanges(); // Força a detecção de alteração no 'isSidebarCollapse'
  }
}
