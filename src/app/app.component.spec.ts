import { AppComponent } from './app.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
describe('Application keyboard navigation', () => {
  it('moves the skip link focus to the main region', () => {
    const main = document.createElement('main');
    main.id = 'main-content'; main.tabIndex = -1;
    document.body.appendChild(main);
    const event = new MouseEvent('click', { cancelable: true });
    const app = new AppComponent({ events: new Subject() } as unknown as Router);
    app.skipToContent(event);
    expect(event.defaultPrevented).toBeTrue();
    expect(document.activeElement).toBe(main);
    main.remove();
    app.ngOnDestroy();
  });
  it('counts page changes, excluding the initial load, anchors and query changes', () => {
    const events = new Subject<NavigationEnd>();
    const target = window as unknown as { zaraz?: unknown };
    const previous = target.zaraz;
    const calls: string[] = [];
    target.zaraz = { track: (name: string) => calls.push(name) };
    const app = new AppComponent({ events } as unknown as Router);
    try {
      ['/', '/#archive', '/?lang=en#people', '/book', '/book#volume5', '/'].forEach((url, index) => {
        events.next(new NavigationEnd(index, url, url));
      });
      expect(calls).toEqual(['Pageview', 'Pageview']);
      app.ngOnDestroy();
      events.next(new NavigationEnd(9, '/news', '/news'));
      expect(calls.length).toBe(2);
    } finally { app.ngOnDestroy(); target.zaraz = previous; }
  });
});
