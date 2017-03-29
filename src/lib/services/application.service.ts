import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';
import {API_URL} from "../../app/app.module";

@Injectable()
export class ApplicationService{

  private _url:string = `${API_URL}/application/`;

  constructor(private _api: Api) {
  }

  public createApplication(data:any){

    let url:string = `${this._url}`;
    return this._api.request('POST', url, null, data)
  }

  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json());
  }
}
