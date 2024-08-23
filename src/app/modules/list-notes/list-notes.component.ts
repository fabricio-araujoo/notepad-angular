import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from '~/app/shared/components/card/card.component';
import { GridComponent } from '~/app/shared/components/grid/grid.component';
import { Note } from '~/app/core/entities/Note';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [
    CardComponent,
    GridComponent,
    CdkDropList,
    CdkDrag,
    MatGridListModule,
  ],
  templateUrl: './list-notes.component.html',
  styleUrl: './list-notes.component.scss',
})
export class ListNotesComponent {
  cards: Note[] = [
    { title: 'Bronze age', content: 'Bronze age' },
    { title: 'Iron age', content: 'Iron age' },
    { title: 'Middle ages', content: 'Middle ages' },
    { title: 'Early modern period', content: 'Early modern period' },
    { title: 'Long nineteenth century', content: 'Long nineteenth century' },
  ];

  drop(event: CdkDragDrop<Note[]>) {
    moveItemInArray<Note>(this.cards, event.previousIndex, event.currentIndex);

    console.log({ cards: this.cards });
  }
}
