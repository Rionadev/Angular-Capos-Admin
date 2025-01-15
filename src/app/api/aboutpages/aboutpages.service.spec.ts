import { TestBed } from '@angular/core/testing';

import { AboutpagesService } from './aboutpages.service';

describe('AboutpagesService', () => {
  let service: AboutpagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutpagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
