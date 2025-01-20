import { Injectable } from '@angular/core';
import { NotesService } from '../../services/notes/notes.service';
import { IListNotesUseCaseOutput } from './list-notes.use-case.interface';

@Injectable({
  providedIn: 'root',
})
export class ListNotesUseCase {
  constructor(private notesService: NotesService) {}

  async execute(): Promise<IListNotesUseCaseOutput> {
    const response = await this.notesService.getListNotes();

    if (!response) {
      return [];
    }

    const notes = response.notes;

    return notes.map((note) => ({
      _id: note?._id || '',
      content: note?.content || '',
      title: note?.title || '',
    }));
  }
}
