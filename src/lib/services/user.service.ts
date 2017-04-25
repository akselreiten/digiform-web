import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';
import {API_URL} from "../../app/app.module";

@Injectable()
export class UserService {

  private _url: string = `${API_URL}/users/`;

  constructor(private _api: Api) {
  }

  public login(username: string, password: string) {

    let data: any = {username: username, password: password};
    let url: string = `${this._url}api-token-auth/`;

    return this._api.request('POST', url, null, data)
      .map(res => res.json())
      .do(res => {
        localStorage.setItem('id_token', res.token);
      });
  }

  public logout(){

    return this._api.request('GET', `${this._url}logout/`)


  }

  public createUser(username: string, password: string, email: string, first_name: string, last_name: string) {

    let data: any = {
      username: username,
      password: password,
      email: email,
      first_name: first_name,
      last_name: last_name
    };
    let url: string = `${this._url}createUser/`;

    return this._api.request('POST', url, null, data)
  }

  public getOwnProfile() {
    return this._api.request('GET', `${this._url}getUser/`)
      .map(res => res.json());
  }

}
