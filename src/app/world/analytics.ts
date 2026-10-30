type Properties = Record<string, string | number>;
type AnalyticsWindow = Window & { zaraz?: { track: (name: string, properties: Properties) => unknown } };

// Analytics must never interrupt a reader's navigation, including when blocked.
export function track(name: string, properties: Properties): void {
  try {
    const zaraz = (window as AnalyticsWindow).zaraz;
    if (zaraz) void Promise.resolve(zaraz.track(name, properties)).catch(() => {});
  } catch { /* Optional analytics. */ }
}

export function trackLink(event: MouseEvent): void {
  if (event.button !== 0 && event.button !== 1) return;
  const anchor = (event.target instanceof Element ? event.target : null)?.closest('a');
  if (!anchor) return;
  const url = new URL(anchor.href, location.href);
  let entry = 'other';
  if (anchor.closest('.preview-dialog')) entry = 'preview_dialog';
  else if (anchor.closest('.library-volume')) entry = 'publication_page';
  else if (anchor.closest('#archive')) entry = 'archive';
  else if (anchor.closest('#current')) entry = 'current_issue';
  else if (anchor.closest('.top-tools')) entry = 'top_nav';
  else if (anchor.closest('#calendar')) entry = anchor.querySelector('img') ? 'calendar_intro_image' : 'calendar_intro_button';
  else if (anchor.closest('#opening')) entry = 'hero';
  const publication = /^phospho([1-5])\.chiwutang\.uk$/.exec(url.hostname);
  const pdf = /\/phospho([1-5])\.pdf$/i.exec(url.pathname);
  if (pdf && (url.hostname === 'download.chiwutang.uk' || publication)) {
    track('publication_pdf_click', { publication_id: `phospho${pdf[1]}`, entry_point: entry });
  } else if (publication) {
    track('publication_read_click', { publication_id: `phospho${publication[1]}`, entry_point: entry });
  } else if (url.hostname === 'calendar.chiwutang.uk') {
    track(url.pathname.startsWith('/subscribe') ? 'subscription_entry_click' : 'calendar_entry_click', { entry_point: entry });
  }
}
