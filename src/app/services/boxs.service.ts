import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import Datasnapshot = firebase.database.DataSnapshot;
import { AuthService } from './auth.service';

@Injectable()
export class BoxsService {
  boxs: Box[] = [];
  boxsAdmin: Box[] = [];
  boxsSubject = new Subject<any[]>();
  boxsAdminSubject = new Subject<any[]>();
  userId: string;
  emailfromAuth: string;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.emailfromAuth = user.email;
        this.getBoxs();

        console.log('Id de l utilisateur : ' + this.userId);
        console.log('email de l utilisateur : ' + this.emailfromAuth);
      }
     });
  }

  emitBoxs() {
    this.boxsSubject.next(this.boxs);
  }

  emitBoxsAdmin() {
    this.boxsAdminSubject.next(this.boxsAdmin);
  }

  saveBoxs() {
    firebase.database().ref('/Users/').set(this.authService.users);
    firebase.database().ref('/boxs/' + this.userId).set(this.authService.currentUser.boxs);
    firebase.database().ref('/boxsAdmin/').set(this.authService.adminUser.boxs);
  }

  getBoxs() {
    firebase.database().ref('/boxs/' + this.userId).on('value', (data: Datasnapshot) => {
      // this.boxs = data.val() ? data.val() : [];
      this.authService.currentUser.boxs = data.val() ? data.val() : [];
      this.boxs = this.authService.currentUser.boxs;
      this.emitBoxs();
    }
   );
    firebase.database().ref('/boxsAdmin/').on('value', (data: Datasnapshot) => {
      // this.boxs = data.val() ? data.val() : [];
      this.authService.adminUser.boxs = data.val() ? data.val() : [];
      this.boxsAdmin = this.authService.adminUser.boxs;

      this.emitBoxsAdmin();
      }
    );
  }

  getSingleBox(id: number) {

    if (this.emailfromAuth === 'admin@gmail.com') {
      return new Promise(
        (resolve, reject) => {
          firebase.database().ref('/boxsAdmin/' + id).once('value').then(
            (data: Datasnapshot) => {
              resolve(data.val());
            }, (error) => {
              reject(error);
            }
          );
        }
      );
    } else {
        return new Promise(
          (resolve, reject) => {
            firebase.database().ref('/boxs/' + this.userId + '/' + id).once('value').then(
              (data: Datasnapshot) => {
                resolve(data.val());
              }, (error) => {
                reject(error);
              }
            );
          }
        );
      }
  }

  createNewBox(newBox: Box) {
    // this.boxs.push(newBox);
    this.authService.currentUser.boxs.push(newBox);
    this.authService.adminUser.boxs.push(newBox);
    this.saveBoxs();
    this.emitBoxs();
    this.emitBoxsAdmin();
  }

  removeBox(box: Box) {
    const BoxIndexToRemove = this.boxs.findIndex(
      (boxEl) => {
        if (boxEl === box) {
          return true;
        }
      }
    );
    this.boxs.splice(BoxIndexToRemove, 1);
    this.saveBoxs();
    this.emitBoxs();
  }

  swicthOnOne(id: number) {
    this.boxs[id].etat = 'Ouvert';
    this.saveBoxs();
    this.emitBoxs();
  }

  switchoffOne(id: number) {
    this.boxs[id].etat = 'Fermé';
    this.saveBoxs();
    this.emitBoxs();
  }

}
