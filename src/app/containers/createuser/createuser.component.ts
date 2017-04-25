import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  UserService
} from '../../../lib/services'


@Component({
  selector: 'createuser',
  template: require('./createuser.template.html'),
  styles: [require('./createuser.style.scss'),]
})

export class CreateUserComponent {

  public createUserError: any;

  constructor(private _userService: UserService,
              private _router: Router) {

  }

  public createUser(fg: FormGroup) {

    this._userService.createUser(fg.value.username, fg.value.password, fg.value.email, fg.value.first_name, fg.value.last_name)

      .subscribe(success => {
        this._router.navigate(['login'])
      }, error => {
        this.createUserError = error.json();
      });
  }

  public logout(){
    console.log("dude");
    this._router.navigate(['login']);
    localStorage.removeItem("id_token");

  }
}
