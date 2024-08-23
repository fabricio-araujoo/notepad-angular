import { Routes } from '@angular/router';
import { ListNotesComponent } from './modules/list-notes/list-notes.component';

export const routes: Routes = [
  {
    path: '',
    component: ListNotesComponent,
  },
  {
    path: 'tag/:label',
    component: ListNotesComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
