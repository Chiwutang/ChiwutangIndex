import { AnnouncementsService } from './announcements.service';

describe('Bundled announcements', () => {
  const service = new AnnouncementsService();
  it('puts the fifth-volume announcement first and preserves historical article URLs', () => {
    expect(service.getAll()[0].number).toBe(40);
    expect(service.getById('40')?.body).toContain('https://download.chiwutang.uk/Phospho5.pdf');
    for (const id of ['39', '32', '31', '30', '28', '8', '7']) expect(service.getById(id)).not.toBeNull();
  });
  it('contains unique IDs, valid dates and complete local Markdown bodies', () => {
    const all = service.getAll();
    expect(new Set(all.map(item => item.number)).size).toBe(all.length);
    all.forEach(item => {
      expect(Number.isSafeInteger(item.number) && item.number > 0).toBeTrue();
      expect(Number.isNaN(Date.parse(item.date))).toBeFalse();
      expect(item.title.trim().length).toBeGreaterThan(0);
      expect(item.body.trim().length).toBeGreaterThan(0);
    });
  });
  it('returns no announcement for missing or malformed identifiers', () => {
    for (const id of ['999999', '', '../39', '0', '-1', '39.0']) expect(service.getById(id)).toBeNull();
  });
});
