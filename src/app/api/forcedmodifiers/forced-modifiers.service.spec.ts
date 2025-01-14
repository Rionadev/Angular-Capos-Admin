import { TestBed } from '@angular/core/testing';

import { ForcedModifiersService } from './forced-modifiers.service';

describe('ForcedModifiersService', () => {
  let service: ForcedModifiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForcedModifiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
