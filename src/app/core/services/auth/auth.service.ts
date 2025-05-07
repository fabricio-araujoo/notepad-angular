import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { IDefaultResponse } from '../../adapter/http-adapter/http-adapter.interface';
import { HttpAdapterService } from '../../adapter/http-adapter/http-adapter.service';
import { LocalStorageService } from '../../adapter/local-storage/local-storage.service';
import { RouterAdapterService } from '../../adapter/router-adapter/router-adapter.service';
import { ISignInParams, ISignInResponse } from './auth.service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpAdapterService);
  private localStorage = inject(LocalStorageService);
  private routerService = inject(RouterAdapterService);

  async signIn(params: ISignInParams): Promise<ISignInResponse | undefined> {
    try {
      const response = await this.http.post<IDefaultResponse<ISignInResponse>>(
        '/v1/notepad/auth/sign-in',
        params
      );

      if (this.http.hasError(response)) {
        this.http.handleError(response);

        return;
      }

      return response.body?.result;
    } catch (err) {
      const _err = err as HttpErrorResponse;

      console.error(_err.error);

      return;
    }
  }

  async signOut() {
    this.localStorage.remove(ELocalStorageKeys.ACCESS_TOKEN);
    this.routerService.navigate('/sign-in');
  }
}
