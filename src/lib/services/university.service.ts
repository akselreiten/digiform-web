import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';

@Injectable()
export class UniversityService {

  private _url:string = 'http://localhost:8000/universities/';

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
