import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

import {UniversityService} from "../../../lib/services/university.service";


@Component({
  selector: 'universities',
  template: require('./universities.template.html'),
  styles: [require('./universities.style.scss'), ]
})

export class UniversityComponent {

  public universities:any[] = [];


  public test:string = 'Hey';

  constructor(
    private _universityService:UniversityService,


  ) {

    this._universityService.list()
      .subscribe(universities => {
        this.universities = universities;
      }, error => {})
  }

  public login(fg:FormGroup) {
    console.log(fg.value);


  }
}
