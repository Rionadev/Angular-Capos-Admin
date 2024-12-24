import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivestockComponent } from './receivestock.component';

describe('ReceivestockComponent', () => {
  let component: ReceivestockComponent;
  let fixture: ComponentFixture<ReceivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivestockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
