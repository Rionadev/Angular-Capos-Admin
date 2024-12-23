import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorecreditreportsComponent } from './storecreditreports.component';

describe('StorecreditreportsComponent', () => {
  let component: StorecreditreportsComponent;
  let fixture: ComponentFixture<StorecreditreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorecreditreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorecreditreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
