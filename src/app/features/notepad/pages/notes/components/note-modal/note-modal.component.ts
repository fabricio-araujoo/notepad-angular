import { Component, ViewChild } from '@angular/core';
import { DrawerComponent } from '~/app/shared/components/drawer/drawer.component';
import { InputComponent } from '~/app/shared/components/input/input.component';
import { TextEditorComponent } from '~/app/shared/components/text-editor/text-editor.component';
import { TagSelectComponent } from '../tag-select/tag-select.component';

@Component({
  selector: 'app-note-modal',
  imports: [
    DrawerComponent,
    InputComponent,
    TagSelectComponent,
    TextEditorComponent,
  ],
  templateUrl: './note-modal.component.html',
  styleUrl: './note-modal.component.scss',
})
export class NoteModalComponent {
  @ViewChild('drawer')
  private drawer!: DrawerComponent;

  tags = [
    { label: 'Desenvolvimento', value: 'dev' },
    { label: 'Diversão', value: 'fun' },
    { label: 'Importante', value: 'important' },
  ];

  handleClose() {
    console.log('close');
  }

  open() {
    this.drawer.toogle();
  }
}
