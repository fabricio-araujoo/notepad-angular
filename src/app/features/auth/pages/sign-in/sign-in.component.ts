import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IRouterAdapter } from '~/app/core/adapter/router-adapter/router-adapter.interface';
import { RouterAdapterService } from '~/app/core/adapter/router-adapter/router-adapter.service';
import { LocalStoragePlugin } from '~/app/core/plugins/local-storage/local-storage.plugin';
import { AuthService } from '~/app/core/services/auth/auth.service';
import { LoadingStore } from '~/app/core/stores/loading/loading.store';
import { ELocalStorageKeys } from '~/app/shared/interfaces/local-storage';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ValidationService } from '../../validation/sign-in/validation.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  providers: [MessageService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private router: IRouterAdapter = inject(RouterAdapterService);
  private localStorage: LocalStoragePlugin = inject(LocalStoragePlugin);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  protected loadingStore = inject(LoadingStore);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  handleSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.onSignIn();
  }

  handleClickForgotPassword() {
    console.log('esqueci minha senha');
  }

  getErrorMessage(fieldName: string): string | undefined {
    const field = this.form.get(fieldName);

    if (!field || !field.errors) {
      return;
    }

    const firstErrorKey = Object.keys(
      field.errors
    )[0] as keyof typeof ValidationService.errorMessages;

    const errorValue = field.getError(firstErrorKey);

    return ValidationService.getErrorMessage(firstErrorKey, errorValue);
  }

  private async onSignIn() {
    this.loadingStore.show();

    const { email, password } = this.form.value;

    if (!email || !password) {
      return;
    }

    const response = await this.authService.signIn({ email, password });

    if (response?.access_token) {
      return;
    }

    this.localStorage.set(
      ELocalStorageKeys.ACCESS_TOKEN,
      response?.access_token
    );
    this.router.navigate('/notes');

    this.loadingStore.hide();
  }
}
