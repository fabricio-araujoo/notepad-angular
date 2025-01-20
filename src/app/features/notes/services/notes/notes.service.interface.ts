type IReponseNoteItem = {
  _id: string;
  title: string;
  content: string;
};

export type IGetNotesResponse = {
  notes: IReponseNoteItem[];
};

export type IAddNoteParams = {
  title: string;
  content: string;
};

export type IAddNoteResponse = IReponseNoteItem;
