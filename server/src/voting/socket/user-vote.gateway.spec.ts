import { Test, TestingModule } from '@nestjs/testing';
import { UserVoteGateway } from './user-vote.gateway';

describe('UserVoteGateway', () => {
  let gateway: UserVoteGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVoteGateway],
    }).compile();

    gateway = module.get<UserVoteGateway>(UserVoteGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
