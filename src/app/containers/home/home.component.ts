import { Component } from '@angular/core';
import {
  SubjectService
} from '../../../lib/services'


@Component({
  selector: 'home',
  template: require('./home.template.html'),
  styles: [require('./home.style.scss'), ]
})

export class HomeComponent {

  public subjects:any[] = [];

  constructor(private _subjectService:SubjectService) {

    this._subjectService.list()
      .subscribe(subjects => {
        this.subjects = subjects;
      }, error => {})
  }
}
