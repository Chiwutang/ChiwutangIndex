import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../world/page-title.service';
@Component({ selector: 'app-bbs', templateUrl: './bbs.component.html', styleUrls: ['./bbs.component.css'] })
export class BbsComponent implements OnInit {
  readonly columns = ['cold', 'craft', 'spirit'];
  constructor(private readonly title: PageTitleService) {}
  ngOnInit(): void { this.title.setPage('nav.submit'); }
}
