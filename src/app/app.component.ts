import { Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { track, trackLink } from './world/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = '赤乌堂';
  private readonly navigation: Subscription;
  constructor(router: Router) {
    let previousPath: string | undefined;
    // Component ngOnInit updates the title in Angular's next render turn.
    this.navigation = router.events.pipe(delay(0)).subscribe(event => {
      if (!(event instanceof NavigationEnd)) return;
      const path = event.urlAfterRedirects.split(/[?#]/)[0];
      // Zaraz handles the document load. Only a new Angular page needs another view.
      if (previousPath !== undefined && path !== previousPath) {
        // GA4's Zaraz component accepts dl/dt as its standard URL/title fields.
        // Explicit values avoid reusing the initial document's cached context.
        track('page_view', { dl: location.href, dt: document.title });
      }
      previousPath = path;
    });
  }
  ngOnDestroy(): void { this.navigation.unsubscribe(); }
  @HostListener('document:click', ['$event'])
  @HostListener('document:auxclick', ['$event'])
  trackClick(event: MouseEvent): void { trackLink(event); }
  skipToContent(event: MouseEvent): void {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  }
}
