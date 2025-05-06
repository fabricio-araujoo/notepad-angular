import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CoreModule } from './core/core.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, ToastModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-notepad';

  isSidebarCollapse: boolean = false;
}
