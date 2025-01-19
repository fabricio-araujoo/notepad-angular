import { Component, inject } from '@angular/core';
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
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})
export class AddNoteComponent {
  hasFocus: boolean = false;

  addNoteOptions: MenuItem[] = [
    { label: 'Editar' },
    { label: 'Excluir', disabled: true },
    { label: 'Ver Detalhes' },
    { label: 'Configurações' },
  ];

  private title: string = '';
  private content: string = '';

  readonly dialogRef = inject(MatDialogRef<AddNoteComponent>);

  onFocus() {
    this.hasFocus = true;
  }

  onTitleChange(title: string) {
    this.title = title;
  }

  onEditorChange(content: string): void {
    this.content = content;
  }

  handleMenuSelection(item: MenuItem): void {
    console.log('Item selecionado:', item);
  }

  onSave() {
    console.log('Note saved');
    console.log('Title:', this.title);
    console.log('Content:', this.content);

    this.dialogRef.close();
  }
}
