import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductattributesComponent } from './productattributes.component';

describe('ProductattributesComponent', () => {
  let component: ProductattributesComponent;
  let fixture: ComponentFixture<ProductattributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductattributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductattributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
