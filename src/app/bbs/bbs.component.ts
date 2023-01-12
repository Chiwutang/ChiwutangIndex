import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Message} from "./Message";
import {BbsService} from "../bbs.service";


@Component({
  selector: 'app-bbs',
  templateUrl: './bbs.component.html',
  styleUrls: ['./bbs.component.css']
})
export class BbsComponent implements OnInit {

  messages:Message[] =[];


  constructor(private http: HttpClient,private bbsService:BbsService) { }

getMessages(): void {
  this.bbsService.getMessages().subscribe(messages=> this.messages = messages);
}

  ngOnInit(): void {
    this.getMessages();
  }

}
