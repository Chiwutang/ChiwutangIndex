import { Component, HostListener } from '@angular/core';
import { trackLink } from './world/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '赤乌堂';
  @HostListener('document:click', ['$event'])
  @HostListener('document:auxclick', ['$event'])
  trackClick(event: MouseEvent): void { trackLink(event); }
  skipToContent(event: MouseEvent): void {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  }
}
