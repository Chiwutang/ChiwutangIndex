import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { I18nService } from '../i18n/i18n.service';
import { WorldUiService } from '../world/world-ui.service';
@Component({ selector: 'app-nav', templateUrl: './nav.component.html', styleUrls: ['./nav.component.css'] })
export class NavComponent implements OnInit, OnDestroy {
  isHome = true;
  readonly sections = [
    { id: 'opening', label: 'chapter.home' }, { id: 'origin', label: 'chapter.origin' },
    { id: 'current', label: 'chapter.current' }, { id: 'archive', label: 'chapter.archive' },
    { id: 'people', label: 'chapter.people' }, { id: 'submit', label: 'chapter.submit' }
  ];
  private readonly destroy$ = new Subject<void>();
  constructor(private readonly router: Router, public readonly i18n: I18nService, public readonly ui: WorldUiService) {}
  ngOnInit(): void {
    this.isHome = this.router.url.split(/[?#]/)[0] === '/';
    this.router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this.destroy$)).subscribe(() => {
      this.isHome = this.router.url.split(/[?#]/)[0] === '/';
    });
  }
  scrollTo(event: MouseEvent, id: string): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    void this.router.navigate([], { fragment: id, queryParamsHandling: 'preserve' });
    this.ui.setSection(id);
  }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
