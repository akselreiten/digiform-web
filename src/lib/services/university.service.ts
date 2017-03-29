import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';
import {API_URL} from "../../app/app.module";

@Injectable()
export class UniversityService {

  private _url:string = `${API_URL}/universities/`;

  constructor(private _api:Api) {}

  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json().results);
  }

  public listSubjects(id) {
    return this._api.request('GET', this._url + id + "/subjects/")
      .map(res => res.json());
  }

}
