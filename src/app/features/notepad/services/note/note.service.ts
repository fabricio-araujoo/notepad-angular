import { Injectable } from '@angular/core';
import mockNote from '~/assets/mock/note.json';
import {
  IGetNoteParams,
  IGetNoteResponse,
  IGetNotesResponse,
} from './note.service.interface';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor() {}

  async getNotes(): Promise<IGetNotesResponse | undefined> {
    return new Promise((res) => {
      const response: IGetNotesResponse = mockNote;

      setTimeout(() => {
        res(response);
      }, 1000);
    });
  }

  async getNote(params: IGetNoteParams): Promise<IGetNoteResponse | undefined> {
    const note = mockNote.notes.find((item) => item._id === params._id);

    if (!note) {
      return;
    }

    return new Promise((res) => {
      const response: IGetNoteResponse = {
        ...note,
        reminderAt: new Date(note.reminderAt),
      };

      setTimeout(() => {
        res(response);
      }, 1000);
    });
  }

  async saveNote() {}
}
