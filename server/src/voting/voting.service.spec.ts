import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repositories/user.repository';
import { VotingRepository } from 'src/repositories/voting.repository';
import { VotingOptionsRepository } from 'src/repositories/votingOptionRepository';
import { VotingService } from './voting.service';

describe('VotingService', () => {
  let service: VotingService;
  let votingOptionRepository: VotingOptionsRepository;
  let votingRepository: VotingRepository;
  let userRepository: UserRepository;
  
  const mockedUserRepo = {
    // mock the repo `findOneOrFail`
  };


beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingService, {
        provide: UserRepository,
        useValue: {
          getUserByIdAndVotingId: jest.fn()
        }
      }
],
    }).compile();

    service = module.get<VotingService>(VotingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
