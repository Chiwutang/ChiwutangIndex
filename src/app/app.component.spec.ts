import { AppComponent } from './app.component';
describe('Application keyboard navigation', () => {
  it('moves the skip link focus to the main region', () => {
    const main = document.createElement('main');
    main.id = 'main-content'; main.tabIndex = -1;
    document.body.appendChild(main);
    const event = new MouseEvent('click', { cancelable: true });
    const app = new AppComponent();
    app.skipToContent(event);
    expect(event.defaultPrevented).toBeTrue();
    expect(document.activeElement).toBe(main);
    main.remove();
  });
});
