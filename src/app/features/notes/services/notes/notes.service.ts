import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDefaultResponse } from '~/app/core/adapter/http-adapter/http-adapter.interface';
import { HttpAdapterService } from '~/app/core/adapter/http-adapter/http-adapter.service';
import {
  IAddNoteParams,
  IAddNoteResponse,
  IGetNotesResponse,
} from './notes.service.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpAdapterService) {}

  async getListNotes(): Promise<IGetNotesResponse | undefined> {
    try {
      const response = await this.http.get<IDefaultResponse<IGetNotesResponse>>(
        '/v1/notepad/notes/list'
      );

      if (!response.body) {
        return;
      }

      return response.body?.result;
    } catch (err) {
      const _err = err as HttpErrorResponse;

      console.error(_err.error);

      return;
    }
  }

  async addNote(params: IAddNoteParams): Promise<IAddNoteResponse | undefined> {
    try {
      const response = await this.http.post<IDefaultResponse<IAddNoteResponse>>(
        '/v1/notepad/notes/create',
        { ...params }
      );

      if (!response.body) {
        return;
      }

      return response.body?.result;
    } catch (err) {
      const _err = err as HttpErrorResponse;

      console.error(_err.error);

      return;
    }
  }
}
