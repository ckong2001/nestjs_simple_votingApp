import { TestBed } from '@angular/core/testing';

import { MostRecentlyEndedService } from './most-recently-ended.service';

describe('MostRecentlyEndedService', () => {
  let service: MostRecentlyEndedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostRecentlyEndedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
