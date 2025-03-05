import { OverlayModule } from '@angular/cdk/overlay';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {
  MenuComponent,
  MenuItem,
} from '../../../../shared/components/menu/menu.component';
import { TextEditorComponent } from '../../../../shared/components/text-editor/text-editor.component';
import { SaveNoteUseCase } from '../../use-cases/save-note/save-note.use-case';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    MatMenuModule,
    DialogComponent,
    InputComponent,
    TextEditorComponent,
    ButtonComponent,
    MenuComponent,
    OverlayModule,
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})
export class AddNoteComponent {
  @Output() beforeSave = new EventEmitter<void>();

  hasFocus: boolean = false;

  addNoteOptions: MenuItem[] = [
    { label: 'Excluir', disabled: true, visible: true },
  ];

  private title: string = '';
  private content: string = '';

  readonly dialogRef = inject(MatDialogRef<AddNoteComponent>);

  constructor(private saveNoteUseCase: SaveNoteUseCase) {}

  onFocus() {
    this.hasFocus = true;
  }

  onTitleChange(title: string) {
    this.title = title;
  }

  onEditorChange(content: string): void {
    this.content = content;
  }

  onMenuSelectionClick(item: MenuItem): void {
    console.log('Item selecionado:', item);
  }

  onSave() {
    console.log('Note saved');
    console.log('Title:', this.title);
    console.log('Content:', this.content);

    this.saveNoteUseCase.execute({
      _id: '',
      title: this.title,
      content: this.content,
    });

    this.dialogRef.close();
    this.beforeSave.emit();
  }
}
