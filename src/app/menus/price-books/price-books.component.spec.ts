import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBooksComponent } from './price-books.component';

describe('PriceBooksComponent', () => {
  let component: PriceBooksComponent;
  let fixture: ComponentFixture<PriceBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
