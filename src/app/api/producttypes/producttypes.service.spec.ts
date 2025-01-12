import { TestBed } from '@angular/core/testing';

import { ProducttypesService } from './producttypes.service';

describe('ProducttypesService', () => {
  let service: ProducttypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducttypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
