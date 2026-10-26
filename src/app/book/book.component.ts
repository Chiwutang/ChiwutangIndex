import { Component, OnInit } from '@angular/core';
import { PUBLICATIONS, PREVIEWS } from '../world/publications';
import { PageTitleService } from '../world/page-title.service';
@Component({ selector: 'app-book', templateUrl: './book.component.html', styleUrls: ['./book.component.css'] })
export class BookComponent implements OnInit {
  readonly books = PUBLICATIONS;
  readonly previews = PREVIEWS;
  constructor(private readonly title: PageTitleService) {}
  ngOnInit(): void { this.title.setPage('nav.books'); }
}
