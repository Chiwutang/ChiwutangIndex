import { Component, OnInit } from '@angular/core';
import {Issue} from "../news/Issue";
import {ActivatedRoute, Router} from "@angular/router";
import {IssuesService} from "../issues.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  issue:Issue;

  selectedId: string;

  constructor( private route: ActivatedRoute,
               private router: Router,
               public issuesService:IssuesService
              ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.issue = await this.issuesService.getArticle(id)

  }

}
