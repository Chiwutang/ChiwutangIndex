import { AppComponent } from './app.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
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
  it('counts page changes after the rendered title updates, excluding initial load, anchors and queries', fakeAsync(() => {
    const events = new Subject<NavigationEnd>();
    const target = window as unknown as { zaraz?: unknown };
    const previous = target.zaraz;
    const previousTitle = document.title;
    const calls: string[] = [];
    const titles: string[] = [];
    target.zaraz = { track: (name: string, properties: {dt: string}) => { calls.push(name); titles.push(properties.dt); } };
    const app = new AppComponent({ events } as unknown as Router);
    try {
      ['/', '/#archive', '/?lang=en#people', '/book', '/book#volume5', '/'].forEach((url, index) => {
        events.next(new NavigationEnd(index, url, url));
        document.title = `Rendered ${url}`;
        tick();
      });
      expect(calls).toEqual(['page_view', 'page_view']);
      expect(titles).toEqual(['Rendered /book', 'Rendered /']);
      app.ngOnDestroy();
      events.next(new NavigationEnd(9, '/news', '/news'));
      tick();
      expect(calls.length).toBe(2);
    } finally { app.ngOnDestroy(); target.zaraz = previous; document.title = previousTitle; }
  }));
});
