/**
 * Created by Sjur on 28/03/2017.
 */
import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';

@Injectable()
export class ChatService {

  private _url:string = 'http://localhost:8000/chat/';

  constructor(private _api:Api) {}

  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json());
  }

  public sendMessage(data:any) {

    let url:string = `${this._url}`;
    return this._api.request('POST', url, null, data)
  }

}
