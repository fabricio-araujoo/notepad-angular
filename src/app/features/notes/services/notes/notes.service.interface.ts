export type IGetNotesResponse = {
  notes: IReponseNoteItem[];
};

type IReponseNoteItem = {
  _id: string;
  title?: string;
  content?: string;
};
