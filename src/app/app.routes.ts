import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    async loadComponent() {
      return import('./features/auth/pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      );
    },
  },
  {
    path: 'sign-up',
    async loadComponent() {
      return import('./features/auth/pages/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      );
    },
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'notes',
        async loadComponent() {
          return import('./features/notes/notes.component').then(
            (m) => m.NotesComponent
          );
        },
      },
    ],
  },
];
