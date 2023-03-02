import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("刊物一览 - 赤乌堂");

  }

  ngOnInit(): void {
  }

}
