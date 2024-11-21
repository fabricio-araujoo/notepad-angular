import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { GridComponent } from './components/grid/grid.component';
import { CardComponent } from './components/card/card.component';
import { LayoutComponent } from './layout/layout.component';
import { INote } from '~/app/shared/interfaces/note';
import { GetUserUseCase } from './use-cases/get-user/get-user.use-case';
import { ListNotesUseCase } from './use-cases/list-notes/list-notes.use-case';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    LayoutComponent,
    GridComponent,
    CardComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  cards: INote[] = [];

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

    this.cards = notes;

    console.log(this.cards);
  }

  drop(event: CdkDragDrop<INote[]>) {
    moveItemInArray<INote>(this.cards, event.previousIndex, event.currentIndex);
  }
}
