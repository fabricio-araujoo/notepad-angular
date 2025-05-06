import { provideLocationMocks } from '@angular/common/testing';
import { Component, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { RouterAdapterService } from '../../adapter/router-adapter/router-adapter.service';
import { authGuard } from './auth.guard';

@Component({ template: '' })
class DummyComponent {}

describe('authGuard', () => {
  let routerAdapterService: RouterAdapterService;

  const routes: Routes = [
    {
      path: 'protected',
      canActivate: [authGuard],
      component: DummyComponent,
    },
    { path: 'sign-in', component: DummyComponent },
  ];

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: '/protected' } as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideLocationMocks(),
        RouterAdapterService,
      ],
    });

    routerAdapterService = TestBed.inject(RouterAdapterService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve permitir acesso quando o token existe', () => {
    localStorage.setItem(ELocalStorageKeys.ACCESS_TOKEN, 'fake-token');

    const result = runInInjectionContext(TestBed, () =>
      authGuard(mockRoute, mockState)
    );

    expect(result).toBeTrue();
  });

  it('deve bloquear acesso e redirecionar para /sign-in se token estiver ausente', () => {
    const navigateSpy = spyOn(routerAdapterService, 'navigate');

    const result = runInInjectionContext(TestBed, () =>
      authGuard(mockRoute, mockState)
    );

    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith('/sign-in');
  });
});
