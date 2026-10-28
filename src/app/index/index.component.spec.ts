import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nService } from '../i18n/i18n.service';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('switches homepage copy and accessible labels to Japanese', () => {
    const service = TestBed.inject(I18nService);
    const previous = service.language;
    try {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[lang="ja"]');
      button.click();
      fixture.detectChanges();
      expect(button.getAttribute('aria-pressed')).toBe('true');
      expect(fixture.nativeElement.querySelector('.hero-identity').textContent).toContain('ミステリ評論研究会');
      expect(fixture.nativeElement.querySelector('.language-switch').getAttribute('aria-label')).toBe('言語を選択');
      expect(fixture.nativeElement.querySelector('#issue-title').textContent).toContain('『燐』第五巻');
    } finally {
      service.setLanguage(previous);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
