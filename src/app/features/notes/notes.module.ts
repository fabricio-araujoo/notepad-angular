import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotesService } from './services/notes/notes.service';
import { TagsService } from './services/tags/tags.service';
import { SaveNoteUseCase } from './use-cases/save-note/save-note.use-case';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [NotesService, TagsService, SaveNoteUseCase],
})
export class NotesModule {}
