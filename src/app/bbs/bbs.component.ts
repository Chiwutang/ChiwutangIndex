import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
        this.bbsService.addMessage(this.messageForm.value['username'],this.messageForm.value['text']) .subscribe(messages=>
        {
          this.getMessages();
          this.changeDetectorRef.detectChanges()
        });
        this.messageForm.reset()

  }


  constructor(private http: HttpClient,private bbsService:BbsService,private formBuilder: FormBuilder,private changeDetectorRef: ChangeDetectorRef,) { }

getMessages(): void {
  this.bbsService.getMessages().subscribe(messages=> this.messages = messages);
}

  ngOnInit(): void {
    this.getMessages();
  }

}
