import { TestBed } from '@angular/core/testing';

import { AllEndedVotingService } from './all-ended-voting.service';

describe('AllEndedVotingService', () => {
  let service: AllEndedVotingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllEndedVotingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
