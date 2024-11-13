import { Injectable } from '@angular/core';
import { ISignInUseCaseInput } from './sign-in.use-case.interface';
import { LocalStorageService } from '~/app/core/adapter/local-storage/local-storage.service';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { AuthService } from '~/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignInUseCase {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private routerService: RouterAdapterService
  ) {}

  async execute(input: ISignInUseCaseInput): Promise<void> {
    if (!input.email || !input.password) {
      return;
    }

    const response = await this.authService.signIn(input);

    const token = response?.access_token || '';

    if (!token) {
      return;
    }

    this.localStorageService.set(ELocalStorageKeys.access_token, token);

    this.routerService.navigate('/notes');
  }
}
