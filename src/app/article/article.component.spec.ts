import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleComponent } from './article.component';
import { AnnouncementsService } from '../news/announcements.service';
import { PageTitleService } from '../world/page-title.service';

describe('Static announcement routes', () => {
  let component: ArticleComponent;
  let params: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
  let titles: jasmine.SpyObj<PageTitleService>;
  beforeEach(() => {
    params = new BehaviorSubject(convertToParamMap({ id: '39' }));
    titles = jasmine.createSpyObj('PageTitleService', ['setPage', 'setArticle']);
    component = new ArticleComponent({ paramMap: params.asObservable() } as ActivatedRoute, new AnnouncementsService(), titles);
    component.ngOnInit();
  });
  afterEach(() => component.ngOnDestroy());
  it('reads both an old URL and the new announcement immediately from bundled content', () => {
    expect(component.issue?.title).toContain('第四卷');
    params.next(convertToParamMap({ id: '40' }));
    expect(component.issue?.title).toContain('第五卷');
    expect(titles.setArticle).toHaveBeenCalledWith(component.issue!.title);
  });
  it('clears the previous article and title when navigating to an unknown ID', () => {
    params.next(convertToParamMap({ id: '999999' }));
    expect(component.issue).toBeNull();
    expect(titles.setPage).toHaveBeenCalledWith('news.title');
    params.next(convertToParamMap({ id: '../39' }));
    expect(component.issue).toBeNull();
  });
  it('stops reacting to route changes after leaving the page', () => {
    component.ngOnDestroy();
    params.next(convertToParamMap({ id: '40' }));
    expect(component.issue?.number).toBe(39);
  });
});
