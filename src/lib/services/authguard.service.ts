// auth-guard.service.ts

import { Injectable }       from '@angular/core';
import { Router }           from '@angular/router';
import { CanActivate }      from '@angular/router';
import { tokenNotExpired }  from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) {}

  canActivate() {
    if(tokenNotExpired()) {
      return true;
    } else {
      this._router.navigate(['login']);
      return false;
    }
  }
}
