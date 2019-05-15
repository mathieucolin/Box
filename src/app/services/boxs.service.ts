import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

import Datasnapshot = firebase.database.DataSnapshot;


@Injectable()
export class BoxsService {
  boxs: Box[] = [];
  boxsSubject = new Subject<any[]>();

  userId: string;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.getBoxs();

        console.log('Id de l utilisateur : ' + this.userId);
      }
     });
  }

  emitBoxs() {
    this.boxsSubject.next(this.boxs);
  }

  saveBoxs() {
    firebase.database().ref('/boxs/' + this.userId).set(this.boxs);
  }

  getBoxs() {
    firebase.database().ref('/boxs/' + this.userId).on('value', (data: Datasnapshot) => {
      this.boxs = data.val() ? data.val() : [];
      this.emitBoxs();
    }
   );
  }

  getSingleBox(id: number) {
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

  createNewBox(newBox: Box) {
    this.boxs.push(newBox);
    this.saveBoxs();
    this.emitBoxs();
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
