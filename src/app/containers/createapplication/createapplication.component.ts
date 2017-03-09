import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  UserService
} from '../../../lib/services'


@Component({
  selector: 'createapplication',
  template: require('./createapplication.template.html'),
  styles: [require('./createapplication.style.scss'),]
})

export class CreateApplicationComponent {

  public createUserError: any;

  constructor(private _userService: UserService,
              private _router: Router) {

  }

  public createApplication(fg: FormGroup) {

    this._userService.createApplication(fg.value.ntnu_subject, fg.value.university, fg.value.replacement_subject, fg.value.subject_information, fg.value.credits_ntnu, fg.value.approval_justification)

      .subscribe(success => {
        this._router.navigate(['home'])
      }, error => {
        this.createUserError = error.json();
      });
  }
}
