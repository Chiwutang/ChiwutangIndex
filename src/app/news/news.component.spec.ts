import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { NewsComponent } from './news.component';
import { AnnouncementsService } from './announcements.service';

describe('Static announcement list', () => {
  let fixture: ComponentFixture<NewsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppModule, RouterTestingModule] }).compileComponents();
    fixture = TestBed.createComponent(NewsComponent);
    fixture.detectChanges();
  });
  it('renders every bundled announcement without an HTTP client or pending requests', () => {
    const articles = fixture.nativeElement.querySelectorAll('.journal-entry');
    expect(articles.length).toBe(TestBed.inject(AnnouncementsService).getAll().length);
    expect(fixture.nativeElement.querySelector('[aria-busy="true"]')).toBeNull();
    expect(articles[0].textContent).toContain('第五卷电子版发布');
  });
  it('links to a stable local route for the fifth-volume announcement', () => {
    expect(fixture.nativeElement.querySelector('.journal-entry h2 a').getAttribute('href')).toBe('/news/40');
  });
});
