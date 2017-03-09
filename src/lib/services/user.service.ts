import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';

@Injectable()
export class UserService {

  private _url: string = 'http://localhost:8000/users/';

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

  public createApplication(ntnu_subject:string, university:string, replacement:string, subject_info:string, credits_ntnu:number, approval_justification:string){
    let data:any = {ntnu_subject:ntnu_subject, university:university, replacement:replacement, subject_information:subject_info, credits_ntnu:credits_ntnu, approval_justification:approval_justification};
    let url:string = `${this._url}createApplication/`;

    return this._api.request('POST', url, null, data)
  }

}

