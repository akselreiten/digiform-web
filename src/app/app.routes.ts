import { Routes } from '@angular/router';
import { HomeComponent } from './containers';

import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
