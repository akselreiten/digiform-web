import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  ApplicationService
} from '../../../lib/services'
import {UniversityService} from "../../../lib/services/university.service";
import {SubjectService} from "../../../lib/services/subject.service";


@Component({
  selector: 'subjects',
  template: require('./subjects.template.html'),
  styles: [require('./subjects.style.scss'),]
})

export class SubjectComponent {

  public createApplicationError: any;
  public universities:any[] = [];
  public subjects:any[] = [];
  public NTNUsubjects:any[] = [];
  public replacementPlaceholderString:string;

  constructor(private _applicationService: ApplicationService,
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

    this.replacementPlaceholderString = "Velg først universitet";
  }

  public getUniSubjects(event){

    let id = event.target.value;
    let foreignUniString = event.target.value.title;

    if (id > 0){
      this.replacementPlaceholderString = "Velg et fag fra valgte universitet";
    } else {
      this.replacementPlaceholderString = "Velg først universitet";
    }

    this._universityService.listSubjects(id)
      .subscribe(subjects => {
        this.subjects = subjects;
      }, error => {});
  }

  public createApplication(fg: FormGroup) {

    this._applicationService.createApplication(fg.value)
      /*later: add fg.value.subject_information, */
      .subscribe(success => {
        this._router.navigate([''])
      }, error => {
        this.createApplicationError = error.json();
      });
  }

  public createSubjectNavigate(){
    this._router.navigate(['createsubject']);
  }
}
