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

  public subjectError: any;
  public universities:any[] = [];
  public subjects:any[] = [];
  public NTNUsubjects:any[] = [];
  public chosenNtnuSubject:any;
  public chosenForeignSubject:any;
  public replacementPlaceholderString:string;
  public allApplications:any[] = [];

  constructor(private _applicationService: ApplicationService,
              private _universityService: UniversityService,
              private _subjectService: SubjectService,
              private _router: Router) {

    this._subjectService.list()
      .subscribe(subjects => {
        this.subjects = subjects;
      }, error => {})

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

  //  Gets university subjects based on event
  public getUniSubjects(event){

    let id = event.target.value;
    let foreignUniString = event.target.value.title;

    if (id > 0){
      this.replacementPlaceholderString = "Choose a subject from chosen university";
    } else {
      this.replacementPlaceholderString = "Please choose university first";
    }

    this._universityService.listSubjects(id)
      .subscribe(subjects => {
        this.subjects = subjects;
      }, error => {});
  }

  //  Creates application based on form values
  public createApplication(fg: FormGroup) {

    this._applicationService.createApplication(fg.value)
      /*later: add fg.value.subject_information, */
      .subscribe(success => {
        this._router.navigate([''])
      }, error => {
        this.subjectError = error.json();
      });
  }

  //  Gets subject based on form values
  public getSubjects(fg: FormGroup) {

    this._applicationService.getApplications(fg.value.university, fg.value.ntnu_subject, fg.value.approval_status)

      .subscribe(success => {
        this.allApplications = success;
      }, error => {
        this.subjectError = error.json();
      });
  }


  //  Navigates to createsubject
  public createSubjectNavigate(){
    this._router.navigate(['createsubject']);
  }

  //  Logs current user out
  public logout(){
    this._router.navigate(['login']);
    localStorage.removeItem("id_token");

  }
}
