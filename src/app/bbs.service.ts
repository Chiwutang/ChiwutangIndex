import { Injectable } from '@angular/core';
import {Message} from "./bbs/Message";
import {newArray} from "@angular/compiler/src/util";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BbsService {

  private url = 'https://api.chiwutang.uk/bbs';  // URL to web api

  constructor( private http: HttpClient,) { }

    message:Message ={
      id: 1,
  userId: 1,
  text: 'string',
  time: 'string',
  username: 'string'
  }

    message2:Message ={
      id: 2,
  userId: 2,
  text: 'stri2ng',
  time: 'strin2g',
  username: 'str2ing'
  }


  getMessages():Observable<Message[]>{
      return this.http.get<Message[]>(this.url)


  }

}
