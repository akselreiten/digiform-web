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
  public replacementPlaceholderString:string;
  public subjectCode:string;
  public chosenNtnuSubject:any;
  public chosenForeignSubject:any;

  constructor(private _applicationService: ApplicationService,
              private _universityService: UniversityService,
              private _subjectService:SubjectService,
              private _router: Router) {

    this._universityService.list()
      .subscribe(universities => {
        this.universities = universities;
        this.universities = this.universities.slice(1);
      }, error => {});

    this._universityService.listSubjects(1)
      .subscribe(subjects => {
        this.NTNUsubjects = subjects;
      }, error => {});

    this.replacementPlaceholderString = "Please choose exchange university first";
  }

  //  Returns subject by ID
  public getSubjectByID(event,bool){

    let id = event.target.value;

    this._subjectService.getSubject(id)
      .subscribe(subject => {
        if(bool){
          this.chosenNtnuSubject = subject[0].title;
        } else {
          this.chosenForeignSubject = subject[0].title;
        }
      }, error => {});
  }


  //  Returns subject from university if exchange university is chosen
  public getUniSubjects(event){

    let id = event.target.value;

    if (id > 0){
      this.replacementPlaceholderString = "Pick a subject from chosen university";
    } else {
      this.replacementPlaceholderString = "Please choose university first";
    }

    this._universityService.listSubjects(id)
      .subscribe(subjects => {
        this.subjects = subjects;
      }, error => {});
  }

  //  Updates subjects code
  public updateSubjectCode(event){
    let id = event.target.value;
  }

  //  Creates an application based on form values
  public createApplication(fg: FormGroup) {
    this._applicationService.createApplication(fg.value)
      /*later: add fg.value.subject_information, */
      .subscribe(success => {
        this._router.navigate([''])
      }, error => {
        this.createApplicationError = error.json();
      });
  }

  //  Logs current user out
  public logout(){
    this._router.navigate(['login']);
    localStorage.removeItem("id_token");

  }
}
