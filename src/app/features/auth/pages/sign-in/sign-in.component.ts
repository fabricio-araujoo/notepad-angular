import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NotificationAdapterService } from '~/app/core/adapter/notification-adapter/notification-adapter.service';
import { LoadingStore } from '~/app/core/stores/loading/loading.store';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SignInUseCase } from '../../use-cases/sign-in/sign-in.use-case';
import { ValidationService } from '../../validation/sign-in/validation.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  providers: [MessageService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private notification = inject(NotificationAdapterService);
  private signInUseCase = inject(SignInUseCase);
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

    const response = await this.signInUseCase.execute({
      email,
      password,
    });

    if (response?.error) {
      this.notification.error({ title: 'Erro', message: response.error });
    }

    this.loadingStore.hide();
  }
}
