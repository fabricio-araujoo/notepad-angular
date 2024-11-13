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
  cards: INote[] = [
    { title: 'Bronze age', content: 'Bronze age' },
    { title: 'Iron age', content: 'Iron age' },
    { title: 'Middle ages', content: 'Middle ages' },
    { title: 'Early modern period', content: 'Early modern period' },
    { title: 'Long nineteenth century', content: 'Long nineteenth century' },
  ];

  constructor(private getUserUseCase: GetUserUseCase) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  private async fetchUser() {
    await this.getUserUseCase.execute();
  }

  drop(event: CdkDragDrop<INote[]>) {
    moveItemInArray<INote>(this.cards, event.previousIndex, event.currentIndex);
  }
}
