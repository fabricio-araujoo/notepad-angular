import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { INote } from '~/app/shared/interfaces/note';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { GridComponent } from './components/grid/grid.component';
import { LayoutComponent } from './layout/layout.component';
import { GetUserUseCase } from './use-cases/get-user/get-user.use-case';
import { ListNotesUseCase } from './use-cases/list-notes/list-notes.use-case';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [LayoutComponent, GridComponent, ButtonComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  notes: INote[] = [];
  fixed: INote[] = [];

  dialog = inject(MatDialog);

  constructor(
    private getUserUseCase: GetUserUseCase,
    private listNotesUseCase: ListNotesUseCase
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchListNotes();
  }

  private async fetchUser() {
    await this.getUserUseCase.execute();
  }

  private async fetchListNotes() {
    const notes = await this.listNotesUseCase.execute();

    this.notes = notes;

    console.log(this.notes);
  }

  openAddNote() {
    this.dialog.open(AddNoteComponent, {
      width: '500px',
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.fetchListNotes();
    });
  }
}
