import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconAdapterService } from './core/adapter/icon-adapter/icon-adapter.service';
import { CoreModule } from './core/core.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-notepad';

  isSidebarCollapse: boolean = false;

  constructor(
    private iconService: IconAdapterService,
    private cdr: ChangeDetectorRef
  ) {}

  collaseSidebar() {
    this.isSidebarCollapse = !this.isSidebarCollapse;
    this.cdr.detectChanges(); // Força a detecção de alteração no 'isSidebarCollapse'
  }
}
