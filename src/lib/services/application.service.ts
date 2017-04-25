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

  public getApplications(uni:any, subject:any, approval_status:any) {

    return this._api.request('GET',this._url + "getApplications/?uni=" + uni + "&subject=" + subject + "&approval=" + approval_status)
      .map(res => res.json());
  }


}
