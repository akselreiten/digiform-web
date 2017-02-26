import { Routes } from '@angular/router';
import { HomeComponent, LoginComponent } from './containers';

import { NoContentComponent } from './no-content';

import {AuthGuard} from '../lib/services';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login',      component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
