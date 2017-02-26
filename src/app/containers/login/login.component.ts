import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  UserService
} from '../../../lib/services'


@Component({
  selector: 'login',
  template: require('./login.template.html'),
  styles: [require('./login.style.scss'), ]
})

export class LoginComponent {

  public loginError:any;

  constructor(
    private _userService:UserService,
    private _router:Router

  ) {

  }

  public login(fg:FormGroup) {

    this._userService.login(fg.value.username, fg.value.password)
      .subscribe(success => {
        this._router.navigate(['']);
      }, error => {
        this.loginError = error.json();
      });
  }
}
