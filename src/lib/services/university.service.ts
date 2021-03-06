import 'rxjs/Rx';

// Angular
import {Injectable}                     from '@angular/core';

import {Api} from './api.service';
import {API_URL} from "../../app/app.module";

@Injectable()
export class UniversityService {

  private _url:string = `${API_URL}/universities/`;

  constructor(private _api:Api) {}

  //  Lists all universities
  public list() {
    return this._api.request('GET', this._url)
      .map(res => res.json().results);
  }

  //  Lists all subjects on a university
  public listSubjects(id) {
    return this._api.request('GET', this._url + id + "/subjects/")
      .map(res => res.json());
  }

  //  Returns a university given title, city and country
  public getUniversities(title:any, city:any, country:any) {
    return this._api.request('GET',this._url + "getUniversities/?title_contains=" + title + "&city=" + city + "&country=" + country)
  .map(res => res.json());
  }

}
