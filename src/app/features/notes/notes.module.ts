import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUserUseCase } from './use-cases/get-user/get-user.use-case';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [GetUserUseCase],
})
export class NotesModule {}
