export type ITask = {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  status: ETaskStatus;
  projectId?: string;
  tags?: string[];
  dueDate?: Date;
  isArchived: boolean;
  reminderAt?: Date;
};

export enum ETaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}
