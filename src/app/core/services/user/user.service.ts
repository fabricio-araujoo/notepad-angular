import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDefaultResponse } from '../../adapter/http-adapter/http-adapter.interface';
import { HttpAdapterService } from '../../adapter/http-adapter/http-adapter.service';
import { IGetCurrentUserReponse } from './user.service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpAdapterService);

  async getCurrentUser(): Promise<IGetCurrentUserReponse | undefined> {
    try {
      const response = await this.http.get<
        IDefaultResponse<IGetCurrentUserReponse>
      >('/v1/notepad/user/get-current');

      if (this.http.hasError(response)) {
        this.http.handleError(response.body?.error);

        return;
      }

      return response.body?.result;
    } catch (err) {
      const _err = err as HttpErrorResponse;

      this.http.handleError(_err.error?.error);

      return;
    }
  }
}
