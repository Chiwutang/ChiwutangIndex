import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { BookComponent } from './book/book.component';
import { NewsComponent } from './news/news.component';
import { BbsComponent } from './bbs/bbs.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { NgxTurnstileModule,NgxTurnstileFormsModule } from "ngx-turnstile";


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BookComponent,
    NewsComponent,
    BbsComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgxTurnstileModule,
    NgxTurnstileFormsModule,
       ReactiveFormsModule,
      HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'news', component: NewsComponent },
      { path: 'book', component: BookComponent },
      { path: 'bbs', component: BbsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
