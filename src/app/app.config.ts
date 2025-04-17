import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { authTokenInterceptor } from './core/interceptors/auth-token/auth-token.interceptor';
import { unauthorizedInterceptor } from './core/interceptors/unauthorized/unauthorized.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authTokenInterceptor, unauthorizedInterceptor])
    ),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right', // Posição das notificações
      preventDuplicates: true, // Evita notificações duplicadas
      timeOut: 3000, // Tempo padrão de exibição
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'notepad',
        },
      },
    }),
  ],
};
