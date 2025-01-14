import { TestBed } from '@angular/core/testing';

import { ForcedModifierGroupsService } from './forced-modifier-groups.service';

describe('ForcedModifierGroupsService', () => {
  let service: ForcedModifierGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForcedModifierGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
