import { Injectable } from '@angular/core';
import { HttpAdapterService } from '~/app/core/adapter/http-adapter/http-adapter.service';
import { IGetNotesResponse } from './notes.service.interface';
import { IDefaultResponse } from '~/app/core/adapter/http-adapter/http-adapter.interface';
import { HttpErrorResponse } from '@angular/common/http';

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
      if (err instanceof HttpErrorResponse) {
        return err.error;
      }

      return;
    }
  }
}
