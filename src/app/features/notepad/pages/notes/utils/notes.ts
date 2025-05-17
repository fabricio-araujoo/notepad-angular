import { INote } from '~/app/shared/interfaces/note';
import { IGetNotesResponse } from '../../../services/note/note.service.interface';

export const formatNotes = (notes: IGetNotesResponse['notes']): INote[] => {
  const _notes = notes.map((item) => ({
    ...item,
    reminderAt: new Date(item.reminderAt),
  }));

  return _notes;
};

export const organizeNotes = (
  notes: INote[]
): {
  archived: INote[];
  default: INote[];
  pinned: INote[];
} => {
  const archived: INote[] = [];
  const pinned: INote[] = [];
  const defaultNotes: INote[] = [];

  notes.forEach((note) => {
    if (note.isArchived) {
      archived.push(note);

      return;
    }

    if (note.isPinned) {
      pinned.push(note);

      return;
    }

    defaultNotes.push(note);
  });

  return {
    archived,
    default: defaultNotes,
    pinned,
  };
};
