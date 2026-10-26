import { Component, OnInit } from '@angular/core';
import { PageTitleService } from './page-title.service';
@Component({ selector: 'app-not-found', template: `<section class="interior-page paper-grain not-found frame"><p class="folio">404 / CHIWUTANG</p><h1>{{ 'notfound.title' | t }}</h1><p>{{ 'notfound.desc' | t }}</p><a routerLink="/" class="ink-button">{{ 'notfound.back' | t }} →</a></section>` })
export class NotFoundComponent implements OnInit {
  constructor(private readonly title: PageTitleService) {}
  ngOnInit(): void { this.title.setPage('notfound.title'); }
}
