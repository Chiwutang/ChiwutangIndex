import { Component, OnInit } from '@angular/core';
import {Octokit} from "@octokit/core";
import {Message} from "../bbs/Message";
import {Issue} from "./Issue";
import {ActivatedRoute, Router} from "@angular/router";
import {BbsService} from "../bbs.service";
import {IssuesService} from "../issues.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(public router:Router,public activeRoute:ActivatedRoute,public issuesService:IssuesService) { }

  issues:Issue[] =[];


  ngOnInit(): void {
    this.issues=[]
    this.issuesService.getArticles().then(l=> l.forEach(i=>this.issues.push(i)))
  }


  gotoArticle(issue:any):void{
    this.router.navigate(['article'] , {relativeTo: this.activeRoute}).then(r => console.log(r))
  }



}
