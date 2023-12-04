import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private snackbar: MatSnackBar) { }

  logIn() {
    this.auth.signInWithPopup(new GoogleAuthProvider).then((res: any) => {
      sessionStorage.setItem('userInfo', JSON.stringify(res));
      this.router.navigate(['/home']);
      this.snackbar.open('Login Success!', 'dismiss', {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    })
  }

  signOut() {
    this.auth.signOut().then((res: any) => {
      this.router.navigate(['/login']);
      sessionStorage.clear();
      this.snackbar.open('You have been logged out!', 'dismiss', {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    })
  }
}
