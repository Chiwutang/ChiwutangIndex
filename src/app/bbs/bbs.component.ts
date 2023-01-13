import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';


import {Message} from "./Message";
import {BbsService} from "../bbs.service";


@Component({
  selector: 'app-bbs',
  templateUrl: './bbs.component.html',
  styleUrls: ['./bbs.component.css']
})
export class BbsComponent implements OnInit {

  messages:Message[] =[];

    messageForm = this.formBuilder.group({
    username: '',
    text: ''
  });

      onSubmit(): void {
    console.log(this.messageForm.value)
        this.bbsService.addMessage(this.messageForm.value['username'],this.messageForm.value['text']) .subscribe();
    this.messageForm.reset()
        this.getMessages()
        location.reload();
  }


  constructor(private http: HttpClient,private bbsService:BbsService,private formBuilder: FormBuilder) { }

getMessages(): void {
  this.bbsService.getMessages().subscribe(messages=> this.messages = messages);
}

  ngOnInit(): void {
    this.getMessages();
  }

}
