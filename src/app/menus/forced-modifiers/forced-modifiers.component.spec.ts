import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcedModifiersComponent } from './forced-modifiers.component';

describe('ForcedMorifiersComponent', () => {
  let component: ForcedModifiersComponent;
  let fixture: ComponentFixture<ForcedModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcedModifiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForcedModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
