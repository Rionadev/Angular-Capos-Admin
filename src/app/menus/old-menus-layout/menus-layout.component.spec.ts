import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusLayoutComponent } from './menus-layout.component';

describe('MenusLayoutComponent', () => {
  let component: MenusLayoutComponent;
  let fixture: ComponentFixture<MenusLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
