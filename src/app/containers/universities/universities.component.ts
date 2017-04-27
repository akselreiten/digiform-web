import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {UniversityService} from "../../../lib/services/university.service";


@Component({
  selector: 'universities',
  template: require('./universities.template.html'),
  styles: [require('./universities.style.scss'),]
})

export class UniversityComponent {

  public universities: any[] = [];
  public universityError: any;
  public searchResults: any[] = [];

  public test: string = 'Hey';

  constructor(private _universityService: UniversityService,
              private _router: Router) {

    this._universityService.list()
      .subscribe(universities => {
        this.universities = universities;
      }, error => {
      })
  }

  public getUniversities(fg: FormGroup) {

    this._universityService.getUniversities(fg.value.title, fg.value.city, fg.value.country)

      .subscribe(success => {
        this.searchResults = success;
      }, error => {
        this.universityError = error.json();
      });
  }

  public login(fg: FormGroup) {
    console.log(fg.value);
  }

  //  Logs current user out
  public logout() {
    this._router.navigate(['login']);
    localStorage.removeItem("id_token");

  }
}
