import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { INote } from '~/app/shared/interfaces/note';
import { LoadingStore } from '~/app/shared/stores/loading/loading.store';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { NoteService } from '../../services/note/note.service';
import { GridComponent } from './components/grid/grid.component';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { NoteComponent } from './components/note/note.component';
import { formatNotes, organizeNotes } from './utils/notes';

@Component({
  selector: 'app-notes',
  imports: [
    CommonModule,
    NoteComponent,
    ButtonComponent,
    IconComponent,
    TooltipComponent,
    NoteModalComponent,
    SkeletonComponent,
    GridComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  private noteService: NoteService = inject(NoteService);
  private loadingStore: LoadingStore = inject(LoadingStore);

  @ViewChild('noteModal')
  noteDrawerRef!: NoteModalComponent;

  private _notes = signal<{
    default: INote[];
    pinned: INote[];
    archived: INote[];
  }>({
    default: [],
    pinned: [],
    archived: [],
  });

  private _showArchivedNotes = signal<boolean>(false);

  get notes() {
    return this._notes();
  }

  get showArchivedNotes() {
    return this._showArchivedNotes();
  }

  get loading() {
    return this.loadingStore.isLoading$;
  }

  ngOnInit(): void {
    this.fetchNotes();
  }

  handleShowArchivedNotes() {
    this._showArchivedNotes.set(!this.showArchivedNotes);
  }

  handleOpenNote() {
    this.noteDrawerRef.open();
  }

  private async fetchNotes() {
    this.loadingStore.show();

    const response = await this.noteService.getNotes();

    if (!response?.notes) {
      this.loadingStore.hide();

      return;
    }

    const _notes = response?.notes;

    const formattedNotes = formatNotes(_notes);

    const {
      archived,
      default: defaultNotes,
      pinned,
    } = organizeNotes(formattedNotes);

    this._notes.set({
      default: defaultNotes,
      pinned,
      archived,
    });

    this.loadingStore.hide();
  }
}
