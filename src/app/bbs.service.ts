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



  getMessages():Observable<Message[]>{
      return this.http.get<Message[]>(this.url)
  }



  addMessage(sendMessage:SendMessage): Observable<SendMessage>{
     console.log(sendMessage)
    return this.http.post<SendMessage>(this.url,sendMessage);
  }

}
