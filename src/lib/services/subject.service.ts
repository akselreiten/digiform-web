import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';

@Injectable()
export class SubjectService {

  private _url:string = 'http://localhost:8000/subjects/';

  constructor(private _api:Api) {}

  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json().results);
  }

  public createSubject(data:any){

    let url:string = `${this._url}`;
    return this._api.request('POST', url, null, data)
  }

  public getSubject(id) {
    return this._api.request('GET', this._url + id + "/")
      .map(res => res.json());
  }

}
