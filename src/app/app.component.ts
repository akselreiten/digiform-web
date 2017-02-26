/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.style.scss')],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(
    public appState: AppState
  ) {}

}
