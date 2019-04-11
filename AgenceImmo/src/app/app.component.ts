import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyC0B00CJ7RCus3eiMFll3HRqcHm3P2US0k',
    authDomain: 'agenceimmo-236db.firebaseapp.com',
    databaseURL: 'https://agenceimmo-236db.firebaseio.com',
    projectId: 'agenceimmo-236db',
    storageBucket: 'agenceimmo-236db.appspot.com',
    messagingSenderId: '302569164168'
  };
  firebase.initializeApp(config);
  }

}
