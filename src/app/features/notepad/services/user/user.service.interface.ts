import { ITag } from '~/app/shared/interfaces/tag';

export type IGetCurrentUserReponse = {
  profile: {
    id: string;
    dateOfBirth: string;
    email: string;
    name: string;
    lastAccess: Date;
  };
};

export type IGetLastActivityResponse = {
  page: {
    name: string;
    path: string;
    lastAccess: string;
  };
  events: ITag[];
};
