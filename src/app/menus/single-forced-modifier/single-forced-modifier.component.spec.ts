import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleForcedModifierComponent } from './single-forced-modifier.component';

describe('SingleForcedModifierComponent', () => {
  let component: SingleForcedModifierComponent;
  let fixture: ComponentFixture<SingleForcedModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleForcedModifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleForcedModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
