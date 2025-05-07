import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { IRouterAdapter } from './router-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export class RouterAdapterService implements IRouterAdapter {
  private router: Router = inject(Router);

  private currentRouteSubject = new BehaviorSubject<string>('');

  currentRoute$ = this.currentRouteSubject.asObservable();

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRouteSubject.next(this.router.url);
      });
  }

  getCurrentRoute(): string {
    return this.router.url;
  }

  navigate(url: string): void {
    this.router.navigate([url]);
  }
}
