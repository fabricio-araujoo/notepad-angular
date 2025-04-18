import { Injectable, signal } from '@angular/core';
import { IUser } from '~/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  private readonly _profile = signal<IUser | null>(null);

  get profile() {
    console.log({ _profile: this._profile() });

    return this._profile;
  }

  updateProfile(profile: IUser) {
    this._profile.set(profile);
  }
}
