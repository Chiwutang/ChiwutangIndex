import { NotFoundComponent } from './world/not-found.component';
import { FirefliesComponent } from './world/fireflies.component';
import { PreviewComponent } from './world/preview.component';
import { LanguageSwitchComponent } from './world/language-switch.component';
import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { BookComponent } from './book/book.component';
import { NewsComponent } from './news/news.component';
import { BbsComponent } from './bbs/bbs.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import { ArticleComponent } from './article/article.component';
import {MarkdownModule} from "ngx-markdown";
import { TranslatePipe } from './i18n/translate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BookComponent,
    NewsComponent,
    BbsComponent,
    NavComponent,
    FooterComponent,
    ArticleComponent,
    LanguageSwitchComponent,
    PreviewComponent,
    FirefliesComponent,
    NotFoundComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'news', component: NewsComponent },
      { path: 'book', component: BookComponent },
      { path: 'bbs', component: BbsComponent },
      { path: 'news/:id', component: ArticleComponent },
      { path: 'books', redirectTo: 'book', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
