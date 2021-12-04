import { TestBed } from '@angular/core/testing';

import { AllVotingService } from './all-voting.service';

describe('AllVotingService', () => {
  let service: AllVotingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllVotingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
