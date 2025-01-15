import { TestBed } from '@angular/core/testing';

import { ModifierTypesService } from './modifier-types.service';

describe('ModifierTypesService', () => {
  let service: ModifierTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifierTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
