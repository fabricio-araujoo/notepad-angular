import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '~/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  // O estado é armazenado aqui
  private profile = new BehaviorSubject<IUser | null>(null);

  // Expose o estado como um observable
  profile$ = this.profile.asObservable();

  // Método para atualizar o estado
  updateProfile(profile: IUser) {
    this.profile.next(profile);
  }
}
