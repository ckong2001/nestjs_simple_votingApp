import { TestBed } from '@angular/core/testing';

import { CreateVotingService } from './create-voting.service';

describe('CreateVotingService', () => {
  let service: CreateVotingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateVotingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
