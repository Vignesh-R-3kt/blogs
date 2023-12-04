import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetail: any;

  constructor(private googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem("userInfo") || "");
    this.userDetail = userData.additionalUserInfo.profile;
  }

  logout() {
    this.googleAuth.signOut();
  }
}
