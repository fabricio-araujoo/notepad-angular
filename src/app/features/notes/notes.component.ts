import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '~/app/core/services/user/user.service';
import { ProfileStore } from '~/app/core/stores/profile/profile.service';
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
  imports: [CommonModule, LayoutComponent, ButtonComponent, GridComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  @ViewChild('noteDrawer', { read: ViewContainerRef, static: true })
  noteDrawerContainer!: ViewContainerRef;

  noteDrawerRef!: ComponentRef<NoteModalComponent>;

  notes: INote[] = [];
  fixed: INote[] = [];

  constructor(
    private userService: UserService,
    private notesService: NotesService,
    private profileStore: ProfileStore,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await Promise.all([this.fetchUser(), this.fetchListNotes()]);
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

  async handleOpenNote() {
    if (this.noteDrawerRef) {
      return this.noteDrawerRef.instance.open();
    }

    const { NoteModalComponent } = await import(
      './components/note-modal/note-modal.component'
    );

    this.noteDrawerContainer.clear(); // limpa antes de adicionar

    this.noteDrawerRef =
      this.noteDrawerContainer.createComponent(NoteModalComponent);

    this.cdr.detectChanges();

    this.noteDrawerRef?.instance?.open();
  }
}
