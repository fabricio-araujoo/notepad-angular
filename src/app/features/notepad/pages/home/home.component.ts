import { Component, inject } from '@angular/core';
import { IRouterAdapter } from '~/app/core/adapter/router-adapter/router-adapter.interface';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

type INavigationItem = {
  label: string;
  icon: string;
  route: string;
  handleClick: VoidFunction;
}[];

@Component({
  selector: 'app-home',
  imports: [IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router: IRouterAdapter = inject(RouterAdapterService);

  readonly navigationItems: INavigationItem = [
    {
      label: 'Notas',
      icon: 'note',
      route: '/note',
      handleClick: () => {
        this.handleNavigate('note');
      },
    },
    {
      label: 'Tarefas',
      icon: 'check-mark',
      route: '/task',
      handleClick: () => {
        this.handleNavigate('task');
      },
    },
  ];

  handleNavigate(route: string) {
    this.router.navigate(route);
  }
}
