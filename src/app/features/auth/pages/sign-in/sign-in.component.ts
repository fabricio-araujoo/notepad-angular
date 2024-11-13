import { Component } from '@angular/core';
import { SignInUseCase } from '../../use-cases/sign-in/sign-in.use-case';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(private signInUseCase: SignInUseCase) {}

  async onLogin() {
    await this.signInUseCase.execute({
      email: 'test@mail.com',
      password: 'test',
    });
  }
}
