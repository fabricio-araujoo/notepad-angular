import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INote } from '~/app/shared/interfaces/note';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
    selector: 'app-grid',
    imports: [CommonModule, CardComponent, DragDropModule],
    templateUrl: './grid.component.html',
    styleUrl: './grid.component.scss'
})
export class GridComponent {
  @Input() items: INote[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
