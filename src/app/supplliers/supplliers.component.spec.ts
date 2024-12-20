import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplliersComponent } from './supplliers.component';

describe('SupplliersComponent', () => {
  let component: SupplliersComponent;
  let fixture: ComponentFixture<SupplliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplliersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
