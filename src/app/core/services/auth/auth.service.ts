import { Injectable } from '@angular/core';
import { ISignInParams, ISignInResponse } from './auth.service.interface';
import { HttpAdapterService } from '../../adapter/http-adapter/http-adapter.service';
import { LocalStorageService } from '../../adapter/local-storage/local-storage.service';
import { RouterAdapterService } from '../../adapter/router-adapter/router-adapter.service';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { IDefaultResponse } from '../../adapter/http-adapter/http-adapter.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpAdapterService,
    private localStorage: LocalStorageService,
    private routerService: RouterAdapterService
  ) {}

  async signIn(
    params: ISignInParams
  ): Promise<IDefaultResponse<ISignInResponse> | undefined> {
    try {
      const response = await this.http.post<IDefaultResponse<ISignInResponse>>(
        '/v1/notepad/auth/sign-in',
        params
      );

      if (!response.body) {
        return;
      }

      return response.body;
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        return err.error;
      }

      return;
    }
  }

  async signOut() {
    this.localStorage.remove(ELocalStorageKeys.access_token);
    this.routerService.navigate('/sign-in');
  }
}
