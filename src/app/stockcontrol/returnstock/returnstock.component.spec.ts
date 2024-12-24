import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnstockComponent } from './returnstock.component';

describe('ReturnstockComponent', () => {
  let component: ReturnstockComponent;
  let fixture: ComponentFixture<ReturnstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnstockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
