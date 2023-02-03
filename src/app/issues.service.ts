import { Injectable } from '@angular/core';
import {Octokit} from "@octokit/core";
import {Issue} from "./news/Issue";
import {environment} from "../environments/environment";
import {Message} from "./bbs/Message";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient,) { }

  issues:Issue[] =[];


  private url = 'https://api.chiwutang.uk/articles';  // URL to web api

    getArticles(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.url)

  }


  issue:Issue;

  getArticle(id: string):Observable<Issue> {

    return this.http.get<Issue>(this.url+"/"+id)
  }

}
