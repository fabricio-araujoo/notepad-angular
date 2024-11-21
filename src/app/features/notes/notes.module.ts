import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUserUseCase } from './use-cases/get-user/get-user.use-case';
import { ListNotesUseCase } from './use-cases/list-notes/list-notes.use-case';
import { NotesService } from './services/notes/notes.service';
import { TagsService } from './services/tags/tags.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [NotesService, TagsService, GetUserUseCase, ListNotesUseCase],
})
export class NotesModule {}
