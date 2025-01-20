import { Injectable } from '@angular/core';
import { LocalStorageService } from '~/app/core/adapter/local-storage/local-storage.service';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';
import { AuthService } from '~/app/core/services/auth/auth.service';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import {
  ISignInUseCaseInput,
  ISignInUseCaseOutput,
} from './sign-in.use-case.interface';

@Injectable({
  providedIn: 'root',
})
export class SignInUseCase {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private routerService: RouterAdapterService
  ) {}

  async execute(
    input: ISignInUseCaseInput
  ): Promise<ISignInUseCaseOutput | undefined> {
    if (!input.email || !input.password) {
      return;
    }

    const response = await this.authService.signIn(input);

    const token = response?.result?.access_token || '';

    if (!token) {
      return {
        error:
          response?.error ||
          'Não foi possível fazer o login, tente novamente mais tarde.',
      };
    }

    this.localStorageService.set(ELocalStorageKeys.access_token, token);
    this.routerService.navigate('/notes');

    return;
  }
}
