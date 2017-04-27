import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {
  SubjectService
} from '../../../lib/services'
import {ChatService} from "../../../lib/services/chat.service";


@Component({
  selector: 'home',
  template: require('./chat.template.html'),
  styles: [require('./chat.style.scss'),]
})

export class ChatComponent {
  public sendMessageError: any;
  public messages: any[] = [];

  public test: string = 'Hey';

  constructor(private _chatService: ChatService,
              private _router: Router) {

    this._chatService.list()
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
      })
  }

  //  Sends a message to the administrator
  public sendMessage(fg: FormGroup) {
    this._chatService.sendMessage(fg.value)

      .subscribe(success => {
        this._router.navigate(['chat'])
      }, error => {
        this.sendMessageError = error.json();
      });
  }

  //  Updates message
  public updateMessages() {
    this._chatService.list()
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
      })
  }

  //  Helper function for debug
  public login(fg: FormGroup) {
    console.log(fg.value);
  }

  //  Navigates to page for creating application
  public createApplicationNavigate() {
    this._router.navigate(['createapplication']);
  }

  //  Delets ID-token and logs out
  public logout() {
    this._router.navigate(['login']);
    localStorage.removeItem("id_token");

  }
}
