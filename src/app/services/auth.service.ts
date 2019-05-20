import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import Datasnapshot = firebase.database.DataSnapshot;
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  users: User[] = [];
  currentUser: User = null;
  usersSubject = new Subject<any[]>();
  emailfromAuth: string;

  constructor(private afAuth: AngularFireAuth) {
    this.getUsers();
  }

  emitUsers() {
    this.usersSubject.next(this.users);
  }

  createNewUser(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
          () => {
            resolve();
            this.users.push(user);
            this.saveUsers();
            this.emitUsers();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  saveUsers() {
    firebase.database().ref('Users/').set(this.users);
  }

  getUsers() {
      firebase.database().ref('Users/').on('value', (data: Datasnapshot) => {
      this.users = data.val() ? data.val() : [];
      this.getUserFromFirebase();
      this.emitUsers();
    }
   );
  }

  isAdmin(): boolean {
    if (this.currentUser != null) {
      if (this.currentUser.user === false) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getUserFromEmail(emailFromAuth: string): User {
    for (const searchUser of this.users) {
      if (emailFromAuth === searchUser.email) {
        return searchUser;
      }
    }
  }

  getUserFromFirebase(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve) => {
          this.afAuth.authState.subscribe(user => {
              if (user) {
                  this.emailfromAuth = user.email;
                  this.currentUser = this.getUserFromEmail(this.emailfromAuth);
                  return(resolve);
              }
          });
        }
      );
  }
}
