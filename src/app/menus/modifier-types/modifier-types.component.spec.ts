import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTypesComponent } from './modifier-types.component';

describe('ModifierTypesComponent', () => {
  let component: ModifierTypesComponent;
  let fixture: ComponentFixture<ModifierTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
