import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';


import Datasnapshot = firebase.database.DataSnapshot;
import { BoxsService } from './boxs.service';

@Injectable()
export class AuthService {

  users: User[] = [];
  usersSubject = new Subject<any[]>();

  constructor() {
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
      this.emitUsers();
    }
   );
  }

  isAdmin(email: string): boolean {
    for (const searchUser of this.users) {
      if (email === searchUser.email) {
        if (searchUser.user === false) {
          return true;
        }
      }
    }
    return false;
  }
}
