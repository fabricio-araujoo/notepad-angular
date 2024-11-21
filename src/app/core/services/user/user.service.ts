import { Injectable } from '@angular/core';
import { HttpAdapterService } from '../../adapter/http-adapter/http-adapter.service';
import { IGetCurrentUserReponse } from './user.service.interface';
import { IDefaultResponse } from '../../adapter/http-adapter/http-adapter.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpAdapterService) {}

  async getCurrentUser(): Promise<IGetCurrentUserReponse | undefined> {
    try {
      const response = await this.http.get<
        IDefaultResponse<IGetCurrentUserReponse>
      >('/v1/notepad/user/get-current');

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
