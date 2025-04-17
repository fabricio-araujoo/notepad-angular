import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '~/app/core/services/user/user.service';
import { ProfileStore } from '~/app/core/stores/profile/profile.service';
import { INote } from '~/app/shared/interfaces/note';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { GridComponent } from './components/grid/grid.component';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { LayoutComponent } from './layout/layout.component';
import { NotesService } from './services/notes/notes.service';

@Component({
  selector: 'app-notes',
  imports: [
    LayoutComponent,
    GridComponent,
    ButtonComponent,
    NoteModalComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  @ViewChild('noteDrawer') noteDrawer!: NoteModalComponent;

  notes: INote[] = [];
  fixed: INote[] = [];

  constructor(
    private userService: UserService,
    private notesService: NotesService,
    private profileStore: ProfileStore
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchListNotes();
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

  openAddNote() {
    this.noteDrawer.open();
  }
}
