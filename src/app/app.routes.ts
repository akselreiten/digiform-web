import { Routes } from '@angular/router';
import { HomeComponent, LoginComponent, CreateUserComponent,
  UniversityComponent, CreateApplicationComponent, SubjectComponent,
  ProfileComponent,ChatComponent} from './containers';

import { NoContentComponent } from './no-content';

import {AuthGuard} from '../lib/services';
import {CreateSubjectComponent} from "./containers/createsubject/createsubject.component";
import {ReviewComponent} from "./containers/reviews/reviews.component";
import {CreateReviewComponent} from "./containers/createreview/createreview.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login',      component: LoginComponent },
  { path: 'createuser',   component: CreateUserComponent},
  { path: 'universities',   component: UniversityComponent, canActivate: [AuthGuard]},
  { path: 'createapplication', component: CreateApplicationComponent},
  { path: 'subjects', component: SubjectComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'chat', component:ChatComponent},
  { path: 'createsubject', component:CreateSubjectComponent},
  { path: 'reviews', component:ReviewComponent},
  { path: 'createreview', component:CreateReviewComponent},
  { path: '**',    component: NoContentComponent },

];
