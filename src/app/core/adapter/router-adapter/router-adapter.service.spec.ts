import { provideLocationMocks } from '@angular/common/testing';
import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, Routes, provideRouter } from '@angular/router';
import { RouterAdapterService } from './router-adapter.service';

@Component({ template: '' })
class DummyComponent {}

describe('RouterAdapterService', () => {
  let service: RouterAdapterService;
  let router: Router;

  const routes: Routes = [
    { path: 'home', component: DummyComponent },
    { path: 'about', component: DummyComponent },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterAdapterService,
        provideRouter(routes),
        provideLocationMocks(),
      ],
    });

    service = TestBed.inject(RouterAdapterService);
    router = TestBed.inject(Router);
  });

  it('should return current route string via getCurrentRoute()', fakeAsync(async () => {
    await router.navigateByUrl('/home');

    tick(); // simula passagem de tempo para concluir navegação

    expect(service.getCurrentRoute()).toBe('/home');
  }));

  it('should emit route changes in currentRoute$', fakeAsync(async () => {
    const emittedRoutes: string[] = [];

    service.currentRoute$.subscribe((route) => {
      if (route !== '') {
        emittedRoutes.push(route);
      }
    });

    router.navigateByUrl('/about');

    tick(); // avança eventos do router

    expect(emittedRoutes).toContain('/about');
  }));

  it('should call navigate() and trigger Router.navigate()', fakeAsync(async () => {
    const spy = spyOn(router, 'navigate').and.callThrough();

    await service.navigate('/home');

    tick();

    expect(spy).toHaveBeenCalledWith(['/home']);
  }));
});
