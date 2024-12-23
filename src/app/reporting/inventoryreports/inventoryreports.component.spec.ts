import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryreportsComponent } from './inventoryreports.component';

describe('InventoryreportsComponent', () => {
  let component: InventoryreportsComponent;
  let fixture: ComponentFixture<InventoryreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
