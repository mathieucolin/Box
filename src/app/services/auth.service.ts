import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  users: User;

  constructor() {}

  createNewUser(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
          () => {
            resolve();
            this.users = user;
            this.saveUsers();
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
}
