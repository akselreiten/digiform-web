import { Routes } from '@angular/router';
import { HomeComponent, LoginComponent, CreateUserComponent,
  UniversityComponent, CreateApplicationComponent} from './containers';

import { NoContentComponent } from './no-content';

import {AuthGuard} from '../lib/services';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login',      component: LoginComponent },
  { path: 'createuser',   component: CreateUserComponent},
  { path: 'universities',   component: UniversityComponent, canActivate: [AuthGuard]},
  { path: 'createapplication', component: CreateApplicationComponent},
  { path: '**',    component: NoContentComponent },
];