import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';

@Injectable()
export class ApplicationService{

  private _url: string = 'http://localhost:8000/application/';

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
