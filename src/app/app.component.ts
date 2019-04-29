import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Box';
  constructor() {
    const config = {
      apiKey: 'AIzaSyAMBCj9-MDP--1qFscNR9hS5hN3lxaEPnY',
      authDomain: 'boxapp-72b5a.firebaseapp.com',
      databaseURL: 'https://boxapp-72b5a.firebaseio.com',
      projectId: 'boxapp-72b5a',
      storageBucket: 'boxapp-72b5a.appspot.com',
      messagingSenderId: '22150062025'
    };
    firebase.initializeApp(config);
  }
}
