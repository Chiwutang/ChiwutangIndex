import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbsComponent } from './bbs.component';

describe('BbsComponent', () => {
  let component: BbsComponent;
  let fixture: ComponentFixture<BbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbsComponent ]
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
