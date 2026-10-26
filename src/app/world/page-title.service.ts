import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../i18n/i18n.service';
@Injectable({ providedIn: 'root' })
export class PageTitleService {
  private key = 'brand.name';
  private article = '';
  constructor(private readonly title: Title, private readonly i18n: I18nService) {
    this.i18n.language$.subscribe(() => this.update());
  }
  setPage(key: string): void { this.key = key; this.article = ''; this.update(); }
  setArticle(title: string): void { this.article = title; this.update(); }
  private update(): void {
    const brand = this.i18n.translate('brand.name');
    const page = this.article || this.i18n.translate(this.key);
    this.title.setTitle(page === brand ? brand : `${page} — ${brand}`);
  }
}
