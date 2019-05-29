import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuardService implements CanActivate {

  emailfromAuth: string;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise(
          (resolve, reject) => {
              this.afAuth.authState.subscribe(user => {
                  if (user) {
                      this.emailfromAuth = user.email;

                      if (this.emailfromAuth === 'admin@gmail.com') {
                        console.log('true');
                        resolve(true);
                    } else {
                        console.log('false');
                        this.router.navigate(['/boxs']);
                        resolve(false);
                    }
                  }
              });
          }
      );
    }
}
