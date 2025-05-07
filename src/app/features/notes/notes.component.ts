import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '~/app/core/services/user/user.service';
import { ProfileStore } from '~/app/core/stores/profile/profile.store';
import { INote } from '~/app/shared/interfaces/note';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { GridComponent } from './components/grid/grid.component';
// import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { CommonModule } from '@angular/common';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { LayoutComponent } from './layout/layout.component';
import { NotesService } from './services/notes/notes.service';

@Component({
  selector: 'app-notes',
  imports: [
    CommonModule,
    LayoutComponent,
    ButtonComponent,
    GridComponent,
    NoteModalComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  private userService = inject(UserService);
  private notesService = inject(NotesService);
  private profileStore = inject(ProfileStore);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('noteDrawer')
  noteDrawerRef!: NoteModalComponent;

  notes: INote[] = [];
  fixed: INote[] = [];

  async ngOnInit() {
    await Promise.all([this.fetchUser(), this.fetchListNotes()]);
  }

  handleOpenNote() {
    this.noteDrawerRef.open();
  }

  private async fetchUser() {
    const response = await this.userService.getCurrentUser();

    this.profileStore.updateProfile({
      id: response?.profile?.id || '',
      dateOfBirth: response?.profile?.dateOfBirth || '',
      email: response?.profile?.email || '',
      name: response?.profile?.name || '',
    });
  }

  private async fetchListNotes() {
    const response = await this.notesService.getListNotes();

    if (!response) {
      return;
    }

    this.notes = response.notes.map((note) => ({
      _id: note?._id || '',
      content: note?.content || '',
      title: note?.title || '',
    }));

    console.log(this.notes);
  }
}
