import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '赤乌堂';
  skipToContent(event: MouseEvent): void {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  }
}
