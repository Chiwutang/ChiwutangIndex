import { I18nService } from './i18n.service';
import { translations } from './translations';

describe('Japanese localization', () => {
  let previousLanguage: string;
  let previousPreference: string | null;

  beforeEach(() => {
    previousLanguage = document.documentElement.lang;
    previousPreference = localStorage.getItem('chiwutang-lang');
    localStorage.removeItem('chiwutang-lang');
  });

  afterEach(() => {
    document.documentElement.lang = previousLanguage;
    if (previousPreference === null) localStorage.removeItem('chiwutang-lang');
    else localStorage.setItem('chiwutang-lang', previousPreference);
  });

  for (const locale of ['ja', 'ja-JP']) {
    it(`detects the Japanese browser locale ${locale}`, () => {
      spyOnProperty(navigator, 'language', 'get').and.returnValue(locale);
      expect(new I18nService().language).toBe('ja-JP');
    });
  }

  it('restores a saved Japanese preference before browser detection', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('en-US');
    localStorage.setItem('chiwutang-lang', 'ja-JP');
    expect(new I18nService().language).toBe('ja-JP');
  });

  it('persists switching and updates document language and translations', () => {
    const service = new I18nService();
    service.setLanguage('ja-JP');
    expect(localStorage.getItem('chiwutang-lang')).toBe('ja-JP');
    expect(document.documentElement.lang).toBe('ja-JP');
    expect(service.translate('nav.news')).toBe('お知らせ');
    expect(new I18nService().language).toBe('ja-JP');
    service.setLanguage('zh-CN');
    expect(service.translate('nav.news')).toBe('最新消息');
    service.setLanguage('en-US');
    expect(service.translate('nav.news')).toBe('News');
  });

  it('uses browser detection when the saved language is invalid', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('ja-JP');
    localStorage.setItem('chiwutang-lang', 'invalid');
    expect(new I18nService().language).toBe('ja-JP');
  });

  it('can switch to Japanese when storage is blocked', () => {
    const read = spyOn(Storage.prototype, 'getItem').and.throwError('Storage blocked');
    const write = spyOn(Storage.prototype, 'setItem').and.throwError('Storage blocked');
    spyOnProperty(navigator, 'language', 'get').and.returnValue('ja-JP');
    const service = new I18nService();
    expect(service.language).toBe('ja-JP');
    service.setLanguage('en-US');
    service.setLanguage('ja-JP');
    expect(service.translate('nav.news')).toBe('お知らせ');
    read.and.callThrough();
    write.and.callThrough();
  });

  it('provides Japanese text for every existing translation key', () => {
    expect(Object.keys(translations['ja-JP']).sort()).toEqual(Object.keys(translations['zh-CN']).sort());
    for (const text of Object.values(translations['ja-JP'])) expect(text.trim()).not.toBe('');
  });
});
