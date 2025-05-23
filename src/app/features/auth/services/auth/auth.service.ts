import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';

import {
  IDefaultResponse,
  IHttpAdapter,
} from '~/app/core/adapter/http-adapter/http-adapter.interface';
import { HttpAdapterService } from '~/app/core/adapter/http-adapter/http-adapter.service';
import { IRouterAdapter } from '~/app/core/adapter/router-adapter/router-adapter.interface';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';
import { LocalStoragePlugin } from '~/app/core/plugins/local-storage/local-storage.plugin';
import { ISignInParams, ISignInResponse } from './auth.service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: IHttpAdapter = inject(HttpAdapterService);
  private router: IRouterAdapter = inject(RouterAdapterService);
  private localStorage: LocalStoragePlugin = inject(LocalStoragePlugin);

  async signIn(params: ISignInParams): Promise<ISignInResponse | undefined> {
    try {
      const response = await this.http.post<IDefaultResponse<ISignInResponse>>(
        '/v1/notepad/auth/sign-in',
        params
      );

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

  async signOut() {
    this.localStorage.remove(ELocalStorageKeys.ACCESS_TOKEN);
    this.router.navigate('/sign-in');
  }
}
