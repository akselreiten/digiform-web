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

  public createApplicationError: any;

  constructor(private _applicationService: ApplicationService,
              private _router: Router) {

  }

  public createApplication(fg: FormGroup) {

    this._applicationService.createApplication(fg.value.ntnu_subject, fg.value.university, fg.value.replacement_subject, fg.value.credits_ntnu, fg.value.approval_justification)
      /*later: add fg.value.subject_information, */
      .subscribe(success => {
        this._router.navigate(['home'])
      }, error => {
        this.createApplicationError = error.json();
      });
  }
}
