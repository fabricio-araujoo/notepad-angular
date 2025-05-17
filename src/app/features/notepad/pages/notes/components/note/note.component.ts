import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ShowComponentDirective } from '~/app/shared/directives/show-component/show-component.directive';
import { INote } from '~/app/shared/interfaces/note';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { TagComponent } from '../../../../../../shared/components/tag/tag.component';
import { TooltipComponent } from '../../../../../../shared/components/tooltip/tooltip.component';

@Component({
  selector: 'app-note',
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    ShowComponentDirective,
    Menu,
    TooltipComponent,
    TagComponent,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input({ required: true }) note!: INote;

  private _isFocused = signal<boolean>(false);
  private _isMenuOpen = signal<boolean>(false);

  readonly menuItems: MenuItem[] = [
    {
      label: 'Fixar',
      command: () => {
        this.handleFocusNote(false);
      },
    },
    {
      label: 'Arquivar',
      command: () => {
        this.handleFocusNote(false);
      },
    },
    {
      label: 'Excluir',
      command: () => {
        this.handleFocusNote(false);
      },
    },
  ];

  readonly menuArchivedItems: MenuItem[] = [
    {
      label: 'Desarquivar',
      command: () => {
        this.handleFocusNote(false);
      },
    },
  ];

  get focused() {
    return this._isFocused();
  }

  get menuOpen() {
    return this._isMenuOpen();
  }

  handleClickNote() {}

  handleFocusNote(focus?: boolean) {
    this._isFocused.set(focus ?? !this.focused);
  }

  handleOpenMenu() {
    this._isMenuOpen.set(!this.menuOpen);
  }
}
