import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleslegderComponent } from './saleslegder.component';

describe('SaleslegderComponent', () => {
  let component: SaleslegderComponent;
  let fixture: ComponentFixture<SaleslegderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleslegderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleslegderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
