import { Routes } from '@angular/router';
import { ListNotesComponent } from './pages/list-notes/list-notes.component';
import { TaggedListNotesComponent } from './pages/tagged-list-notes/tagged-list-notes.component';

export const routes: Routes = [
  {
    path: '',
    component: ListNotesComponent,
  },
  {
    path: 'tag/:label',
    component: TaggedListNotesComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
