import { Component, signal, ViewChild } from '@angular/core';
import { JSONContent } from '@tiptap/core';
import { DrawerComponent } from '~/app/shared/components/drawer/drawer.component';
import { InputComponent } from '~/app/shared/components/input/input.component';
import { TextEditorComponent } from '~/app/shared/components/text-editor/text-editor.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';

@Component({
  selector: 'app-note-modal',
  imports: [
    DrawerComponent,
    InputComponent,
    // TagSelectComponent,
    TextEditorComponent,
    ButtonComponent,
  ],
  templateUrl: './note-modal.component.html',
  styleUrl: './note-modal.component.scss',
})
export class NoteModalComponent {
  @ViewChild('drawer')
  private drawer!: DrawerComponent;

  private _title = signal<string>('');
  private _content = signal<JSONContent>({});

  get title() {
    return this._title();
  }

  get content() {
    return this._content();
  }

  protected handleClose() {
    console.log('close');
  }

  protected handleChangeTitle(value: string) {
    this._title.set(value);
  }

  protected handleChangeContent(value: JSONContent) {
    this._content.set(value);
  }

  protected handleSave() {
    console.log('save');
    console.log({ title: this.title, content: this.content });
  }

  open() {
    this.drawer.toogle();
  }
}
