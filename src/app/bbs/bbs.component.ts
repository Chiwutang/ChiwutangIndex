import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';


import {Message} from "./Message";
import {BbsService} from "../bbs.service";
import {SendMessage} from "./SendMessage";


@Component({
  selector: 'app-bbs',
  templateUrl: './bbs.component.html',
  styleUrls: ['./bbs.component.css']
})
export class BbsComponent implements OnInit {



  messages:Message[] =[];

  errorMessage:string = '';

    messageForm = this.formBuilder.group({
    username: '',
    text: '',
  });




    s:SendMessage={
      username:'',
      text:'',
    cfTurnstileResponse:''
    }

      onSubmit(): void {
        console.log(this.messageForm.value)

        if (this.messageForm.value['username']==''){
          this.errorMessage = '用户名不可为空'
          return
        }
        if (this.messageForm.value['text']==''){
          this.errorMessage = '留言内容不可为空'
          return
        }


        this.s.username = this.messageForm.value['username'];
        this.s.text = this.messageForm.value['text'];
        this.errorMessage = ''
        this.bbsService.addMessage(this.s) .subscribe(messages=>
        {
          this.getMessages();
          this.changeDetectorRef.detectChanges()
        });
        this.messageForm.reset()

  }


  constructor(private http: HttpClient,private bbsService:BbsService,private formBuilder: UntypedFormBuilder,private changeDetectorRef: ChangeDetectorRef,) { }

getMessages(): void {
  this.bbsService.getMessages().subscribe(messages=> this.messages = messages);
}

  ngOnInit(): void {
    this.getMessages();
  }



}
