import { track, trackLink } from './analytics';

describe('Reader action analytics', () => {
  let host: HTMLDivElement;
  let calls: { name: string; properties: Record<string, unknown> }[];
  let previous: unknown;
  const targetWindow = window as unknown as { zaraz?: unknown };
  beforeEach(() => {
    previous = targetWindow.zaraz;
    calls = [];
    targetWindow.zaraz = { track: (name: string, properties: Record<string, unknown>) => calls.push({ name, properties }) };
    host = document.createElement('div'); document.body.appendChild(host);
  });
  afterEach(() => { host.remove(); targetWindow.zaraz = previous; });
  function click(markup: string, button = 0): void {
    host.innerHTML = markup;
    const target = host.querySelector('img, span, a')!;
    const event = new MouseEvent(button === 1 ? 'auxclick' : 'click', { button });
    Object.defineProperty(event, 'target', { value: target });
    trackLink(event);
  }
  it('attributes a cover click to its volume and archive entry', () => {
    click('<section id="archive"><a href="https://phospho4.chiwutang.uk/"><img alt="cover"></a></section>');
    expect(calls).toEqual([{ name: 'publication_read_click', properties: { publication_id: 'phospho4', entry_point: 'archive' } }]);
  });
  it('recognises PDF intent instead of treating it as a read', () => {
    click('<dialog class="preview-dialog"><a href="https://download.chiwutang.uk/Phospho5.pdf"><span>PDF</span></a></dialog>');
    expect(calls).toEqual([{ name: 'publication_pdf_click', properties: { publication_id: 'phospho5', entry_point: 'preview_dialog' } }]);
  });
  it('distinguishes the calendar image from the subscribe entry, including middle clicks', () => {
    click('<section id="calendar"><a href="https://calendar.chiwutang.uk/"><img alt="calendar"></a></section>', 1);
    click('<section id="calendar"><a href="https://calendar.chiwutang.uk/subscribe/">subscribe</a></section>');
    expect(calls.map(call => [call.name, call.properties['entry_point']])).toEqual([
      ['calendar_entry_click', 'calendar_intro_image'], ['subscription_entry_click', 'calendar_intro_button']
    ]);
  });
  it('ignores unrelated links, right clicks, and non-link targets', () => {
    click('<a href="https://example.com/Phospho5.pdf">other</a>');
    click('<a href="https://phospho5.chiwutang.uk/">read</a>', 2);
    expect(calls.length).toBe(0);
  });
  it('does not throw when analytics is absent or blocked', async () => {
    delete targetWindow.zaraz;
    expect(() => track('calendar_entry_click', {})).not.toThrow();
    targetWindow.zaraz = { track: () => { throw new Error('blocked'); } };
    expect(() => track('calendar_entry_click', {})).not.toThrow();
    targetWindow.zaraz = { track: () => Promise.reject(new Error('offline')) };
    track('calendar_entry_click', {});
    await Promise.resolve();
  });
});
