import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  loggedIn: Boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );
  }

  onSignOut() {
    this.authenticationService.signOutUser();
  }

}
