import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';
import {API_URL} from "../../app/app.module";

@Injectable()
export class ReviewService{

  private _url:string = `${API_URL}/application/`;

  constructor(private _api: Api) {
  }

  public createReview(data:any){

    let url:string = `${this._url}`;
    return this._api.request('POST', url, null, data)
  }

  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json());
  }

  public getReviews(uni:any) {

    return this._api.request('GET',this._url + "getAllApplications/?uni=" + uni)
      .map(res => res.json());
  }


}
