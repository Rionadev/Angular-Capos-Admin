import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcedModifierGroupComponent } from './forced-modifier-group.component';

describe('ForcedModifierGroupComponent', () => {
  let component: ForcedModifierGroupComponent;
  let fixture: ComponentFixture<ForcedModifierGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcedModifierGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForcedModifierGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
