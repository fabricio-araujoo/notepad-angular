import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInUseCase } from './use-cases/sign-in/sign-in.use-case';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SignInUseCase],
})
export class AuthModule {}
