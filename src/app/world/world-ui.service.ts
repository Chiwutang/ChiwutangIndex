import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class WorldUiService {
  private readonly section = new BehaviorSubject('opening');
  readonly section$ = this.section.asObservable();
  setSection(id: string): void {
    if (this.section.value !== id) this.section.next(id);
  }
}
