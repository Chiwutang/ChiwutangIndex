import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Preview, PUBLICATIONS } from './publications';
@Component({ selector: 'app-publication-preview', templateUrl: './preview.component.html' })
export class PreviewComponent implements OnDestroy {
  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;
  @Output() openChange = new EventEmitter<boolean>();
  selected?: Preview;
  readonly latest = PUBLICATIONS[0];
  private opener?: HTMLElement;
  constructor(private readonly cdr: ChangeDetectorRef) {}
  open(item: Preview): void {
    this.opener = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    this.selected = item;
    this.cdr.detectChanges();
    this.dialog.nativeElement.showModal();
    this.dialog.nativeElement.scrollTop = 0;
    this.openChange.emit(true);
  }
  close(): void { this.dialog.nativeElement.close(); }
  onClose(): void {
    this.openChange.emit(false);
    this.opener?.focus({ preventScroll: true });
  }
  onBackdrop(event: MouseEvent): void {
    const dialog = this.dialog.nativeElement;
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) this.close();
  }
  ngOnDestroy(): void {
    if (this.dialog.nativeElement.open) this.dialog.nativeElement.close();
  }
}
