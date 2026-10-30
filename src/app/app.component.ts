import { Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    this.navigation = router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) return;
      const path = event.urlAfterRedirects.split(/[?#]/)[0];
      // Zaraz handles the document load. Only a new Angular page needs another view.
      if (previousPath !== undefined && path !== previousPath) track('Pageview', {});
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
