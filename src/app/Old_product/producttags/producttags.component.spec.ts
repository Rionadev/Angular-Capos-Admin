import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttagsComponent } from './producttags.component';

describe('ProducttagsComponent', () => {
  let component: ProducttagsComponent;
  let fixture: ComponentFixture<ProducttagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducttagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducttagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
