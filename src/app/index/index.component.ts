import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly titleService: Title, private readonly i18n: I18nService) {
  }

  ngOnInit(): void {
    this.i18n.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.titleService.setTitle(this.i18n.translate('brand.name')));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
