import { Injectable } from '@angular/core';
import { HttpAdapterService } from '~/app/core/adapter/http-adapter/http-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpAdapterService) {}

  signIn() {
    console.log('signIn');

    this.http
      .post({
        url: '/v1/notepad/auth/sign-in',
        body: {
          email: 'test@mail.com',
          password: 'test',
        },
      })
      .subscribe();
  }
}
