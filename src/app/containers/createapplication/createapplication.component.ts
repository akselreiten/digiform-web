import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  ApplicationService
} from '../../../lib/services'
import {UniversityService} from "../../../lib/services/university.service";
import {UserService} from "../../../lib/services/user.service";


@Component({
  selector: 'createapplication',
  template: require('./createapplication.template.html'),
  styles: [require('./createapplication.style.scss'),]
})

export class CreateApplicationComponent {

  public createApplicationError: any;
  public universities:any[] = [];

  constructor(private _applicationService: ApplicationService,
              private _universityService: UniversityService,
              private _userService:UserService,
              private _router: Router) {
    this._universityService.list()
      .subscribe(universities => {
        this.universities = universities;
      }, error => {});
  }

  public createApplication(fg: FormGroup) {

    console.log(fg.value);

    this._applicationService.createApplication(fg.value)
      /*later: add fg.value.subject_information, */
      .subscribe(success => {
        this._router.navigate(['home'])
      }, error => {
        this.createApplicationError = error.json();
      });
  }
}
