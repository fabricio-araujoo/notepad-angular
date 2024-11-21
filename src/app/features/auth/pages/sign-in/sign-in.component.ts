import { Component } from '@angular/core';
import { SignInUseCase } from '../../use-cases/sign-in/sign-in.use-case';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LoadingService } from '~/app/core/stores/loading/loading.service';
import { ValidationService } from '../../validation/sign-in/validation.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form: FormGroup;

  error?: string;

  constructor(
    private signInUseCase: SignInUseCase,
    private fb: FormBuilder,
    public loadingService: LoadingService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.onSignIn();
  }

  onClickForgotPassword() {
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

  async onSignIn() {
    this.loadingService.show();

    const { email, password } = this.form.value;

    const response = await this.signInUseCase.execute({
      email,
      password,
    });

    if (response?.error) {
      this.error = response.error;
    }

    this.loadingService.hide();
  }
}
