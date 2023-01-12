import { Injectable } from '@angular/core';
import {Message} from "./bbs/Message";
import {newArray} from "@angular/compiler/src/util";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {SendMessage} from "./bbs/SendMessage";

@Injectable({
  providedIn: 'root'
})
export class BbsService {

  private url = 'https://api.chiwutang.uk/bbs';  // URL to web api

  constructor( private http: HttpClient,) { }

  m:SendMessage = {
    username : '',
   text : ''
 };


  getMessages():Observable<Message[]>{
      return this.http.get<Message[]>(this.url)
  }



  addMessage(username:string,text:string): Observable<SendMessage>{
     console.log(username,text)
    this.m.text = text;
    this.m.username = username;
    console.log(this.m)
    return this.http.post<SendMessage>(this.url,this.m);
  }

}
