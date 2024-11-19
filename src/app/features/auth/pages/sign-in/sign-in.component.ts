import { Component } from '@angular/core';
import { SignInUseCase } from '../../use-cases/sign-in/sign-in.use-case';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationService } from './validation/validation.service';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form: FormGroup;

  constructor(private signInUseCase: SignInUseCase, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    // this.onSignIn();
  }

  async onSignIn() {
    const { email, password } = this.form.value;

    await this.signInUseCase.execute({
      email,
      password,
    });
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
