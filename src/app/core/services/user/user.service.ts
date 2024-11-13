import { Injectable } from '@angular/core';
import { HttpAdapterService } from '../../adapter/http-adapter/http-adapter.service';
import { IGetCurrentUserReponse } from './user.service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpAdapterService) {}

  async getCurrentUser(): Promise<IGetCurrentUserReponse | undefined> {
    try {
      const response = await this.http.get<IGetCurrentUserReponse>(
        '/v1/notepad/user/get-current'
      );

      if (response.status !== 200 || !response.body) {
        return;
      }

      return response.body;
    } catch {
      throw new Error();
    }
  }
}
