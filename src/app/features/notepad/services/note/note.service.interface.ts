import { INote } from '~/app/shared/interfaces/note';

export type IGetNotesResponse = {
  notes: (Omit<INote, 'reminderAt'> & {
    reminderAt: string;
  })[];
};

export type IGetNoteParams = {
  _id: string;
};

export type IGetNoteResponse = INote;
