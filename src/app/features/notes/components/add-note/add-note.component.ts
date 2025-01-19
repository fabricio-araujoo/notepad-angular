import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    DialogComponent,
    InputComponent,
    TextEditorComponent,
    ButtonComponent,
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})
export class AddNoteComponent {
  hasFocus: boolean = false;

  readonly dialogRef = inject(MatDialogRef<AddNoteComponent>);

  onFocus() {
    this.hasFocus = true;
  }

  onEditorChange(content: string): void {
    console.log('Content updated:', content);
  }

  onSave() {
    console.log('Note saved');

    this.dialogRef.close();
  }
}
