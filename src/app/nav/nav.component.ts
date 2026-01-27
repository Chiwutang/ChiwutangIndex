import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  @ViewChild('navbarCollapse') navbarCollapse?: ElementRef<HTMLDivElement>;
  @ViewChild('navbarToggler') navbarToggler?: ElementRef<HTMLButtonElement>;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly router: Router, private readonly renderer: Renderer2) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.closeMobileMenu());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeMobileMenu(): void {
    if (!this.navbarCollapse || !this.navbarToggler) {
      return;
    }

    const collapseEl = this.navbarCollapse.nativeElement;
    const togglerEl = this.navbarToggler.nativeElement;

    this.renderer.removeClass(collapseEl, 'show');
    this.renderer.setAttribute(togglerEl, 'aria-expanded', 'false');
    this.renderer.addClass(togglerEl, 'collapsed');
  }

}
