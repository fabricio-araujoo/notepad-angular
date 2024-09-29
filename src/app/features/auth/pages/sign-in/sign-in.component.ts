import { Component, OnInit } from '@angular/core';
import { SignInService } from '../../services/sign-in/sign-in.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  constructor(private signInService: SignInService) {}

  ngOnInit(): void {
    this.signInService.signIn();
  }
}
