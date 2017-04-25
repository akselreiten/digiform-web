import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  ApplicationService
} from '../../../lib/services'
import {UniversityService} from "../../../lib/services/university.service";
import {SubjectService} from "../../../lib/services/subject.service";

@Component({
  selector: 'createsubject',
  template: require('./createsubject.template.html'),
  styles: [require('./createsubject.style.scss'),]
})

export class CreateSubjectComponent {

  public createSubjectError: any;
  public universities:any[] = [];
  public subjects:any[] = [];
  public NTNUsubjects:any[] = [];

  constructor(private _subjectService: SubjectService,
              private _universityService: UniversityService,
              private _router: Router) {

    this._universityService.list()
      .subscribe(universities => {
        this.universities = universities;
      }, error => {});

    this._universityService.listSubjects(1)
      .subscribe(subjects => {
        this.NTNUsubjects = subjects;
      }, error => {});

  }


  public createSubject(fg: FormGroup) {

    this._subjectService.createSubject(fg.value)

      .subscribe(success => {
        this._router.navigate(['subjects'])
      }, error => {
        this.createSubjectError = error.json();
      });
  }

  public logout(){
    console.log("dude");
    this._router.navigate(['login']);
    localStorage.removeItem("id_token");

  }
}
