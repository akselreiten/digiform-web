import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {UniversityService} from "../../../lib/services/university.service";
import {ReviewService} from "../../../lib/services/review.service";

@Component({
  selector: 'createreview',
  template: require('./createreview.template.html'),
  styles: [require('./createreview.style.scss'),]
})

export class CreateReviewComponent {

  public createReviewError:any;
  public universities:any[] = [];

  constructor(private _reviewService: ReviewService,
              private _universityService: UniversityService,
              private _router: Router) {

    this._universityService.list()
      .subscribe(universities => {
        this.universities = universities;
      }, error => {});

  }


  public createReview(fg: FormGroup) {

    this._reviewService.createReview(fg.value)

      .subscribe(success => {
        this._router.navigate(['reviews'])
      }, error => {
        this.createReviewError = error.json();
      });
  }
}
