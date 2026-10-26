import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Announcement, AnnouncementsService } from '../news/announcements.service';
import { PageTitleService } from '../world/page-title.service';
@Component({ selector: 'app-article', templateUrl: './article.component.html', styleUrls: ['./article.component.css'] })
export class ArticleComponent implements OnInit, OnDestroy {
  issue: Announcement | null = null;
  private readonly destroy$ = new Subject<void>();
  constructor(private readonly route: ActivatedRoute, private readonly announcements: AnnouncementsService, private readonly title: PageTitleService) {}
  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.issue = this.announcements.getById(params.get('id') || '');
      this.title.setPage('news.title');
      if (this.issue) this.title.setArticle(this.issue.title);
    });
  }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
