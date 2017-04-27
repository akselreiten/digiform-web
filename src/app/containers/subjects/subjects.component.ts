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
        this.subjectError = error.json();
      });
  }

  public getSubjects(fg: FormGroup) {

    this._applicationService.getApplications(fg.value.university, fg.value.ntnu_subject, fg.value.approval_status)

      .subscribe(success => {
        this.allApplications = success;
      }, error => {
        this.subjectError = error.json();
      });
  }


  public createSubjectNavigate(){
    this._router.navigate(['createsubject']);
  }

  public logout(){
    this._router.navigate(['login']);
    localStorage.removeItem("id_token");

  }
}
