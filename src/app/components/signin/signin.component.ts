import { Component } from '@angular/core';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private googleAuth: GoogleAuthService) { }

  login() {
    this.googleAuth.logIn();
  }
}
