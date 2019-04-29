import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;


@Injectable()
export class BoxsService {
  boxs: Box[] = [];
  boxsSubject = new Subject<any[]>();

  constructor() {
    this.getBoxs();
  }

  emitBoxs() {
    this.boxsSubject.next(this.boxs);
  }

  saveBoxs() {
    firebase.database().ref('/boxs').set(this.boxs);
  }

  getBoxs() {
    firebase.database().ref('/boxs').on('value', (data: Datasnapshot) => {
      this.boxs = data.val() ? data.val() : [];
      this.emitBoxs();
    }
   );
  }

  getSingleBox(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/boxs/' + id).once('value').then(
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
    this.boxs.slice(BoxIndexToRemove, 1);
    this.saveBoxs();
    this.emitBoxs();
  }
}
