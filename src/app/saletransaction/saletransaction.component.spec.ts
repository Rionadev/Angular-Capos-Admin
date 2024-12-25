import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaletransactionComponent } from './saletransaction.component';

describe('SaletransactionComponent', () => {
  let component: SaletransactionComponent;
  let fixture: ComponentFixture<SaletransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaletransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaletransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
