import { Injectable } from '@angular/core';
import { NotesService } from '../../services/notes/notes.service';
import { IAddNoteParams } from '../../services/notes/notes.service.interface';
import { ISaveNoteUseCaseInput } from './save-note.use-case.interface';

@Injectable({
  providedIn: 'root',
})
export class SaveNoteUseCase {
  constructor(private notesService: NotesService) {}

  async execute(input: ISaveNoteUseCaseInput): Promise<void> {
    const params: IAddNoteParams = {
      title: input.title,
      content: input.content,
    };

    if (!params.title && !params.content) {
      return;
    }

    await this.notesService.addNote(params);
  }
}
