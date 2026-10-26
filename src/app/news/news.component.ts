import { Component, OnInit } from '@angular/core';
import { Announcement, AnnouncementsService } from './announcements.service';
import { PageTitleService } from '../world/page-title.service';
@Component({ selector: 'app-news', templateUrl: './news.component.html', styleUrls: ['./news.component.css'] })
export class NewsComponent implements OnInit {
  readonly issues: readonly Announcement[];
  constructor(announcements: AnnouncementsService, private readonly title: PageTitleService) {
    this.issues = announcements.getAll();
  }
  ngOnInit(): void { this.title.setPage('news.title'); }
}
