import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';
import {API_URL} from "../../app/app.module";

@Injectable()
export class SubjectService {

  private _url:string = `${API_URL}/subjects/`;


  constructor(private _api:Api) {}

  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json().results);
  }

  //  API request to create subject
  public createSubject(data:any){

    let url:string = `${this._url}`;
    return this._api.request('POST', url, null, data)
  }

  //  API request to get subject from database
  public getSubject(id) {
    return this._api.request('GET', this._url + id + "/")
      .map(res => res.json());
  }

}
