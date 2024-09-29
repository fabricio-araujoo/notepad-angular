import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { GridComponent } from './components/grid/grid.component';
import { CardComponent } from './components/card/card.component';
import { LayoutComponent } from './layout/layout.component';
import { INote } from '~/app/shared/interfaces/note';

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
export class NotesComponent {
  cards: INote[] = [
    { title: 'Bronze age', content: 'Bronze age' },
    { title: 'Iron age', content: 'Iron age' },
    { title: 'Middle ages', content: 'Middle ages' },
    { title: 'Early modern period', content: 'Early modern period' },
    { title: 'Long nineteenth century', content: 'Long nineteenth century' },
  ];

  drop(event: CdkDragDrop<INote[]>) {
    moveItemInArray<INote>(this.cards, event.previousIndex, event.currentIndex);

    console.log({ cards: this.cards });
  }
}
