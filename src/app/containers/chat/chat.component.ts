import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  SubjectService
} from '../../../lib/services'
import {ChatService} from "../../../lib/services/chat.service";


@Component({
  selector: 'home',
  template: require('./chat.template.html'),
  styles: [require('./chat.style.scss'), ]
})

export class ChatComponent {

  public messages:any[] = [];

  public test:string = 'Hey';

  constructor(
    private _chatService:ChatService,
    private _router:Router

  ) {

    this._chatService.list()
      .subscribe(messages => {
        this.messages = messages;
      }, error => {})
  }

  public login(fg:FormGroup) {
    console.log(fg.value);

  }

  public createApplicationNavigate(){
    this._router.navigate(['createapplication']);
  }
}
