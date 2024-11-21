import { Injectable } from '@angular/core';
import { UserService } from '~/app/core/services/user/user.service';
import { IGetUserUseCaseOutput } from './get-user.use-case.interface';
import { ProfileService } from '~/app/core/stores/profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class GetUserUseCase {
  constructor(
    private userService: UserService,
    private profileStore: ProfileService
  ) {}

  async execute(): Promise<IGetUserUseCaseOutput> {
    const response = await this.userService.getCurrentUser();

    this.profileStore.updateProfile({
      id: response?.profile?.id || '',
      dateOfBirth: response?.profile?.dateOfBirth || '',
      email: response?.profile?.email || '',
      name: response?.profile?.name || '',
    });
  }
}
