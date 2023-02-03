import {NgModule, SecurityContext} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { BookComponent } from './book/book.component';
import { NewsComponent } from './news/news.component';
import { BbsComponent } from './bbs/bbs.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { ArticleComponent } from './article/article.component';
import {MarkdownModule} from "ngx-markdown";


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BookComponent,
    NewsComponent,
    BbsComponent,
    NavComponent,
    FooterComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
       ReactiveFormsModule,
      HttpClientModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'news', component: NewsComponent },
      { path: 'book', component: BookComponent },
      { path: 'bbs', component: BbsComponent },
      { path: 'news/:id', component: ArticleComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
