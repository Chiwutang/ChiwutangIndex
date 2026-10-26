import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbsComponent } from './bbs.component';

describe('BbsComponent', () => {
  let component: BbsComponent;
  let fixture: ComponentFixture<BbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
