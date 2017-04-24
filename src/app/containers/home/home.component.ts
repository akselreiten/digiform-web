import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  SubjectService
} from '../../../lib/services'
import {ApplicationService} from "../../../lib/services/application.service";


@Component({
  selector: 'home',
  template: require('./home.template.html'),
  styles: [require('./home.style.scss'), ]
})

export class HomeComponent {

  public subjects:any[] = [];
  public applications:any[] = [];

  constructor(
    private _subjectService:SubjectService,
    private _applicationService:ApplicationService,
    private _router:Router

  ) {

    this._subjectService.list()
      .subscribe(subjects => {
        this.subjects = subjects;
      }, error => {})

    this._applicationService.list()
      .subscribe(applications => {
        this.applications = applications;
      }, error => {})
  }

  public login(fg:FormGroup) {
    console.log(fg.value);

  }

  public createApplicationNavigate(){
    this._router.navigate(['createapplication']);
  }
}
