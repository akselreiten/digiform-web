import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


import {UserService} from "../../../lib/services/user.service";


@Component({
  selector: 'home',
  template: require('./profile.template.html'),
  styles: [require('./profile.style.scss'), ]
})

export class ProfileComponent {

  public ownProfile: any[] = [];

  constructor(private _userService: UserService,
              private _router: Router) {

    this._userService.getOwnProfile()
      .subscribe(ownProfile => {
        this.ownProfile = ownProfile;
      }, error => {})
  }

  //  Logs current user out
  public logout(){
    this._router.navigate(['login']);
    localStorage.removeItem("id_token");

  }

}
