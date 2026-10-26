import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { MEMBERS, PREVIEWS, PUBLICATIONS } from '../world/publications';
import { PageTitleService } from '../world/page-title.service';
import { WorldUiService } from '../world/world-ui.service';
@Component({ selector: 'app-index', templateUrl: './index.component.html', styleUrls: ['./index.component.css'] })
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly latest = PUBLICATIONS[0];
  readonly earlier = PUBLICATIONS.slice(1);
  readonly previews = PREVIEWS;
  readonly members = MEMBERS;
  motionPaused = false;
  previewOpen = false;
  private observer?: IntersectionObserver;
  private printObserver?: IntersectionObserver;
  private scrollFrame: number | null = null;
  private readonly reduced = matchMedia('(prefers-reduced-motion: reduce)');
  private readonly scroll = () => {
    if (this.scrollFrame !== null) return;
    this.scrollFrame = requestAnimationFrame(() => {
      const art = this.host.nativeElement.querySelector<HTMLElement>('.hero-art');
      if (art) art.style.transform = !this.reduced.matches && innerWidth > 760 ? `translate3d(0,${Math.min(scrollY * .12, 100)}px,0)` : '';
      this.scrollFrame = null;
    });
  };
  constructor(public readonly i18n: I18nService, private readonly title: PageTitleService,
    private readonly ui: WorldUiService, private readonly zone: NgZone, private readonly host: ElementRef<HTMLElement>) {}
  ngOnInit(): void { this.title.setPage('brand.name'); this.ui.setSection('opening'); }
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.scroll, { passive: true });
      if (!('IntersectionObserver' in window)) return;
      this.observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) this.zone.run(() => this.ui.setSection(entry.target.id));
      }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
      this.host.nativeElement.querySelectorAll('section[id]').forEach(section => this.observer?.observe(section));
      this.printObserver = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('revealed'); this.printObserver?.unobserve(entry.target); }
      }, { threshold: .2 });
      const cover = this.host.nativeElement.querySelector('.issue-cover');
      if (cover) this.printObserver.observe(cover);
    });
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll);
    if (this.scrollFrame !== null) cancelAnimationFrame(this.scrollFrame);
    this.observer?.disconnect(); this.printObserver?.disconnect();
  }
}
