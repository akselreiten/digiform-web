import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';

@Injectable()
export class UserService {

  private _url:string = 'http://localhost:8000/users/';

  constructor(private _api:Api) {}

  public login(username:string, password:string) {

    let data:any = {username:username, password:password};
    let url:string = `${this._url}api-token-auth/`;

    return this._api.request('POST', url, null, data)
      .map(res => res.json())
      .do(res => {
        localStorage.setItem('id_token', res.token);
      });
  }
}
