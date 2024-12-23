import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreportsComponent } from './salesreports.component';

describe('SalesreportsComponent', () => {
  let component: SalesreportsComponent;
  let fixture: ComponentFixture<SalesreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
