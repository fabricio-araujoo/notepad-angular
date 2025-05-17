import { JSONContent } from '@tiptap/core';

export type INote = {
  _id: string;
  userId: string;
  title: string;
  content: JSONContent;
  tags?: string[]; // ["trabalho", "ideias"]
  projectId?: string; // opcional
  isPinned: boolean;
  isArchived: boolean;
  isFavorite: boolean;
  reminderAt?: Date;
};
