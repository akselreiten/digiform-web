import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  ApplicationService
} from '../../../lib/services'


@Component({
  selector: 'createapplication',
  template: require('./createapplication.template.html'),
  styles: [require('./createapplication.style.scss'),]
})

export class CreateApplicationComponent {

  public createUserError: any;

  constructor(private _applicationService: ApplicationService,
              private _router: Router) {

  }

  public createApplication(fg: FormGroup) {

    this._applicationService.createApplication(fg.value.ntnu_subject, fg.value.university, fg.value.replacement, fg.value.applicationID, fg.value.application_status)

      .subscribe(success => {
        this._router.navigate(['home'])
      }, error => {
        this.createUserError = error.json();
      });
  }
}
