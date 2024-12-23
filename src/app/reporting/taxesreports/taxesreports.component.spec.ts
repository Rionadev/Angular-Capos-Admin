import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesreportsComponent } from './taxesreports.component';

describe('TaxesreportsComponent', () => {
  let component: TaxesreportsComponent;
  let fixture: ComponentFixture<TaxesreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxesreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
