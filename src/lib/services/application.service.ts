import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';

@Injectable()
export class ApplicationService{

  private _url: string = 'http://localhost:8000/application/';

  constructor(private _api: Api) {
  }

  public createApplication(ntnu_subject:string, university:string, replacement:string, applicationID:number, application_status:string){
    let data:any = {ntnu_subject:ntnu_subject, university:university, replacement:replacement, applicationID:applicationID, application_status:application_status};
    let url:string = `${this._url}createApplication/`;

    return this._api.request('POST', url, null, data)
  }

  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json().results);
  }
}
