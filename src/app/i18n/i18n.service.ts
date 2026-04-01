import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageCode, translations } from './translations';

const STORAGE_KEY = 'chiwutang-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly defaultLanguage: LanguageCode = 'zh-CN';
  private readonly languageSubject = new BehaviorSubject<LanguageCode>(this.defaultLanguage);
  readonly language$ = this.languageSubject.asObservable();

  constructor() {
    const detected = this.getInitialLanguage();
    this.setLanguage(detected);
  }

  get language(): LanguageCode {
    return this.languageSubject.value;
  }

  setLanguage(language: LanguageCode): void {
    this.languageSubject.next(language);
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }

  translate(key: string): string {
    const current = translations[this.language][key];
    if (current) {
      return current;
    }

    return translations[this.defaultLanguage][key] ?? key;
  }

  private getInitialLanguage(): LanguageCode {
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (fromStorage === 'zh-CN' || fromStorage === 'en-US') {
      return fromStorage;
    }

    const browserLanguage = navigator.language.toLowerCase();
    return browserLanguage.startsWith('zh') ? 'zh-CN' : 'en-US';
  }
}
