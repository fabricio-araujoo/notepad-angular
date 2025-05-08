import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { NotepadComponent } from './features/notepad/notepad.component';

export const routes: Routes = [
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
    canActivate: [authGuard],
    component: NotepadComponent,
    children: [
      {
        path: '',
        async loadComponent() {
          return import('./features/notepad/pages/home/home.component').then(
            (m) => m.HomeComponent
          );
        },
      },
      {
        path: 'note',
        async loadComponent() {
          return import('./features/notepad/pages/notes/notes.component').then(
            (m) => m.NotesComponent
          );
        },
      },
      {
        path: 'task',
        async loadComponent() {
          return import('./features/notepad/pages/tasks/tasks.component').then(
            (m) => m.TasksComponent
          );
        },
      },
    ],
  },
];
