import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotesService } from './services/notes/notes.service';
import { TagsService } from './services/tags/tags.service';
import { GetUserUseCase } from './use-cases/get-user/get-user.use-case';
import { ListNotesUseCase } from './use-cases/list-notes/list-notes.use-case';
import { SaveNoteUseCase } from './use-cases/save-note/save-note.use-case';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    NotesService,
    TagsService,
    GetUserUseCase,
    ListNotesUseCase,
    SaveNoteUseCase,
  ],
})
export class NotesModule {}
