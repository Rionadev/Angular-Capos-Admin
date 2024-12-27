import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricebooksComponent } from './pricebooks.component';

describe('PricebooksComponent', () => {
  let component: PricebooksComponent;
  let fixture: ComponentFixture<PricebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricebooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
