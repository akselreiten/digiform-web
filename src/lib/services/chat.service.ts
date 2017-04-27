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

  //  API request to get all messages
  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json());
  }

  //  API request to send messages
  public sendMessage(data:any) {

    let url:string = `${this._url}`;
    return this._api.request('POST', url, null, data)
  }

}
