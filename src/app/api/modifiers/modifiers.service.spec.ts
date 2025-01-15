import { TestBed } from '@angular/core/testing';

import { ModifiersService } from './modifiers.service';

describe('ModifiersService', () => {
  let service: ModifiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
