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

  siteKey = '0x4AAAAAAAB8CJnEhWfuYgjH';

  messages:Message[] =[];

    messageForm = this.formBuilder.group({
    username: '',
    text: '',
  });


    cfTurnstileResponse:string = '';

    s:SendMessage={
      username:'',
      text:'',
    cfTurnstileResponse:''
    }

      onSubmit(): void {
        console.log(this.messageForm.value)
        this.s.cfTurnstileResponse =  this.cfTurnstileResponse;
        this.s.username = this.messageForm.value['username'];
        this.s.text = this.messageForm.value['text'];
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

   sendCaptchaResponse(captchaResponse: string|null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    if (captchaResponse==null){

    }else {
      this.cfTurnstileResponse = captchaResponse;
    }
  }

}
