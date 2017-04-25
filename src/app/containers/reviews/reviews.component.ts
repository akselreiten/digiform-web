import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {UniversityService} from "../../../lib/services/university.service";
import {FormGroup} from "@angular/forms";
import {ReviewService} from "../../../lib/services/review.service";

@Component({
  selector: 'reviews',
  template: require('./reviews.template.html'),
  styles: [require('./reviews.style.scss'),]
})


export class ReviewComponent {

  public universities:any[] = [];
  public reviews:any[] = [];
  public reviewError:any;

  constructor(
    private _universityService: UniversityService,
    private _reviewService: ReviewService,
    private _router: Router) {

    this._universityService.list()
      .subscribe(universities => {
        this.universities = universities;
        this.universities = this.universities.slice(1);
      }, error => {});

  }

  public getUniversityReviews(fg: FormGroup) {

    this._reviewService.getReviews(fg.value.university)

      .subscribe(success => {
        this.reviews = success;
      }, error => {});
  }

  public createReviewNavigate(){
    this._router.navigate(['createreview']);
  }
}
