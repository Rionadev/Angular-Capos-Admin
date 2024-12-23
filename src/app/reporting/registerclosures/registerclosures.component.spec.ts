import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterclosuresComponent } from './registerclosures.component';

describe('RegisterclosuresComponent', () => {
  let component: RegisterclosuresComponent;
  let fixture: ComponentFixture<RegisterclosuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterclosuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterclosuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
