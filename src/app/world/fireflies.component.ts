import { AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, ViewChild } from '@angular/core';
interface Firefly { x: number; y: number; radius: number; vx: number; vy: number; phase: number; }
@Component({ selector: 'app-fireflies', template: '<canvas #canvas id="fireflies" aria-hidden="true"></canvas>' })
export class FirefliesComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() paused = false;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D | null = null;
  private readonly reduced = matchMedia('(prefers-reduced-motion: reduce)');
  private raf: number | null = null;
  private width = 0;
  private height = 0;
  private previousTime = 0;
  private points: Firefly[] = [];
  private pointer = { x: -1000, y: -1000 };
  private readonly onResize = () => { this.resize(); this.sync(); };
  private readonly onVisibility = () => this.sync();
  private readonly onPointer = (event: PointerEvent) => { this.pointer = { x: event.clientX, y: event.clientY }; };
  private readonly onPointerOut = (event: PointerEvent) => { if (!event.relatedTarget) this.pointer = { x: -1000, y: -1000 }; };
  constructor(private readonly zone: NgZone) {}
  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    if (!this.context) return;
    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize, { passive: true });
      window.addEventListener('pointermove', this.onPointer, { passive: true });
      window.addEventListener('pointerout', this.onPointerOut, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibility);
      this.reduced.addEventListener('change', this.onVisibility);
      this.resize(); this.sync();
    });
  }
  ngOnChanges(): void { if (this.context) this.zone.runOutsideAngular(() => this.sync()); }
  private resize(): void {
    const scale = Math.min(devicePixelRatio || 1, 1.5);
    this.width = innerWidth; this.height = innerHeight;
    this.canvas.nativeElement.width = this.width * scale;
    this.canvas.nativeElement.height = this.height * scale;
    this.context?.setTransform(scale, 0, 0, scale, 0, 0);
    this.points = Array.from({ length: this.width < 700 ? 22 : 48 }, () => ({
      x: Math.random() * this.width, y: Math.random() * this.height, radius: Math.random() * 1.3 + .4,
      vx: (Math.random() - .5) * 7, vy: Math.random() * -9 - 3, phase: Math.random() * Math.PI * 2
    }));
  }
  private sync(): void {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    this.raf = null;
    if (this.paused || this.reduced.matches || document.hidden) {
      this.context?.clearRect(0, 0, this.width, this.height); return;
    }
    this.previousTime = performance.now();
    this.raf = requestAnimationFrame(time => this.draw(time));
  }
  private draw(time: number): void {
    const context = this.context;
    if (!context) return;
    const dt = Math.min((time - this.previousTime) / 1000, .05) || .016;
    this.previousTime = time;
    context.clearRect(0, 0, this.width, this.height);
    for (const p of this.points) {
      const dx = this.pointer.x - p.x, dy = this.pointer.y - p.y;
      const near = dx * dx + dy * dy < 160 * 160;
      p.x += (p.vx + (near ? dx * .045 : 0)) * dt;
      p.y += (p.vy + (near ? dy * .045 : 0)) * dt;
      p.phase += dt * 1.4;
      if (p.y < 0) p.y = this.height;
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      context.fillStyle = `rgba(220,203,145,${.18 + (.5 + .5 * Math.sin(p.phase)) * .55})`;
      context.beginPath(); context.arc(p.x, p.y, p.radius, 0, Math.PI * 2); context.fill();
    }
    this.raf = requestAnimationFrame(next => this.draw(next));
  }
  ngOnDestroy(): void {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointer);
    window.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.reduced.removeEventListener('change', this.onVisibility);
  }
}
