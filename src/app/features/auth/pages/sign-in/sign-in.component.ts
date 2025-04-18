import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingStore } from '~/app/core/stores/loading/loading.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SignInUseCase } from '../../use-cases/sign-in/sign-in.use-case';
import { ValidationService } from '../../validation/sign-in/validation.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form: FormGroup;

  error?: string;

  constructor(
    public loadingStore: LoadingStore,
    private signInUseCase: SignInUseCase,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  private async onSignIn() {
    this.loadingStore.show();

    const { email, password } = this.form.value;

    const response = await this.signInUseCase.execute({
      email,
      password,
    });

    if (response?.error) {
      this.error = response.error;
    }

    this.loadingStore.hide();
  }

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
}
