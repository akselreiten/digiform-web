import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  ApplicationService
} from '../../../lib/services'
import {UniversityService} from "../../../lib/services/university.service";
import {SubjectService} from "../../../lib/services/subject.service";


@Component({
  selector: 'createapplication',
  template: require('./createapplication.template.html'),
  styles: [require('./createapplication.style.scss'),]
})

export class CreateApplicationComponent {

  public createApplicationError: any;
  public universities:any[] = [];
  public subjects:any[] = [];
  public NTNUsubjects:any[] = [];
  public foreignUniversityTitle:string;

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

    /*for (let entry of this.subjects){
      console.log(entry);
      if (entry.university.title = "NTNU"){
        this.NTNUsubjects.push(entry);
      }
    }*/

  }

  public getUniSubjects(event){

    let id = event.target.value;

    this._universityService.listSubjects(id)
      .subscribe(subjects => {
        this.subjects = subjects;
      }, error => {});
  }

  public createApplication(fg: FormGroup) {

    console.log(fg.value);

    this._applicationService.createApplication(fg.value)
      /*later: add fg.value.subject_information, */
      .subscribe(success => {
        this._router.navigate([''])
      }, error => {
        this.createApplicationError = error.json();
      });
  }
}
