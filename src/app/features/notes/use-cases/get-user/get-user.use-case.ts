import { Injectable } from '@angular/core';
import { UserService } from '~/app/core/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class GetUserUseCase {
  constructor(private userService: UserService) {}

  async execute(): Promise<void> {
    const response = await this.userService.getCurrentUser();

    console.log({ response });
  }
}
