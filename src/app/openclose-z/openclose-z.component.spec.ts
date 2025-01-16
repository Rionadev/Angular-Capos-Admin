import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpencloseZComponent } from './openclose-z.component';

describe('OpencloseZComponent', () => {
  let component: OpencloseZComponent;
  let fixture: ComponentFixture<OpencloseZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpencloseZComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpencloseZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
