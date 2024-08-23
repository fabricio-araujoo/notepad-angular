import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private currentRouteSubject = new BehaviorSubject<string>('');

  currentRoute$ = this.currentRouteSubject.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRouteSubject.next(this.router.url);
      });
  }

  getCurrentRoute(): string {
    return this.router.url;
  }
}
