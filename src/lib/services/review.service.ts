import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';
import {API_URL} from "../../app/app.module";

@Injectable()
export class ReviewService{

  private _url: string = `${API_URL}/university_reviews/`;

  constructor(private _api: Api) {
  }

  //  API request to create a review in the database
  public createReview(data:any){

    let url:string = `${this._url}`;
    return this._api.request('POST', url, null, data)
  }

  //  API request to list all reviews in database
  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json());
  }

  //  API request to get reviews given a university
  public getReviews(uni:any) {

    return this._api.request('GET',this._url + "?uni=" + uni)
      .map(res => res.json());
  }


}
