import { Component } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
@Component({
  selector: 'app-language-switch',
  template: `<div class="language-switch" role="group" [attr.aria-label]="'language.label' | t">
    <button type="button" lang="zh-CN" aria-label="切换为中文" [attr.aria-pressed]="i18n.language === 'zh-CN'" (click)="i18n.setLanguage('zh-CN')">中</button>
    <button type="button" lang="en" aria-label="Switch to English" [attr.aria-pressed]="i18n.language === 'en-US'" (click)="i18n.setLanguage('en-US')">EN</button>
  </div>`
})
export class LanguageSwitchComponent {
  constructor(public readonly i18n: I18nService) {}
}
