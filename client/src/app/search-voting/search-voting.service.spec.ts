import { TestBed } from '@angular/core/testing';

import { SearchVotingService } from './search-voting.service';

describe('SearchVotingService', () => {
  let service: SearchVotingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchVotingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
