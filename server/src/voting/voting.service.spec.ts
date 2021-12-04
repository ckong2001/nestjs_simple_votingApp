import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/user.repository';

import { VotingRepository } from '../repositories/voting.repository';
import { VotingOptionsRepository } from '../repositories/votingOptionRepository';
import { VotingService } from './voting.service';
import { Voting } from '../entities/Voting';
import { User } from '../entities/User';
import * as idValidator from '../utils/validateId';
import { VotingOptions } from '../entities/VotingOptions';

describe('VotingService', () => {
  let votingService: VotingService;
  let votingOptionRepository: VotingOptionsRepository;
  let votingRepository: VotingRepository;
  let userRepository: UserRepository;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingService, 
        {
          provide: VotingOptionsRepository,
          useValue: {
            save: jest.fn(() => true),
          }
        },
        {
          provide: VotingRepository,
          useValue: {
            save: jest.fn(() => true),
          }
        },
        {
          provide: UserRepository,
          useValue: {
            save: jest.fn(() => true),
          }
        }
    ],
    }).compile();

    votingService = module.get<VotingService>(VotingService);
    votingOptionRepository = module.get(VotingOptionsRepository);
    votingRepository = module.get(VotingRepository);
    userRepository = module.get(UserRepository);
  });

  describe("userVote" , () => {
    it('shoud thorw bad request when user input a invalid user id',async () => {
      let hkId = "random_string";
      let votingOptionId = "random_string"
      let idVaidaSpy = jest.spyOn(idValidator,'isValidId')
      await expect(votingService.userVote(hkId,votingOptionId)).rejects.toThrowError(BadRequestException)
      expect(idVaidaSpy).toBeCalledTimes(1);
    })

    it('should throw bad request when user vote for a ended voting',async () => {
      let validHkId = "F4917401";
      let votingOptionId = "votingOptionId"
      let endVoting:Voting = new Voting();
      endVoting.end = new Date(2000,1,1);
      let isEarlierThanEndTimeOfSpy = jest.spyOn(votingService,"isEarlierThanEndTimeOf")
      
      //Assume voting Ootion is existed
      votingService.IsVotingOptionExisted = jest.fn(async(votingOptionId) => {return await true});
      votingService.getVotingByVotingOptionId = jest.fn(async (votingOptionId) => { return await endVoting});

      await expect(votingService.userVote(validHkId,votingOptionId)).rejects.toThrowError(BadRequestException)
      expect(isEarlierThanEndTimeOfSpy).toBeCalledTimes(1);
    })

    it('shoud throw bad request when a user vote for a voting that he/she voted before',async () => {
      let validHkId = "F4917401";
      let votingOptionId = "votingOptionId"
      process.env.HASH_SALT_KEY = "random_salt"
      const IsUserVotingOptionExistedSpy = jest.spyOn(votingService, 'IsUserVotingOptionExisted');
      votingService.IsVotingOptionExisted = jest.fn(async(votingOptionId) => {return await true});
      votingRepository.getVotingByVotingOptionId = jest.fn(async (votingOptionId) => { return await new Voting()});
      votingService.isEarlierThanEndTimeOf = jest.fn( (voting,dateTime) => {return true});
      userRepository.getUserByIdAndVotingId = jest.fn(async(hkId: string, voting: string) => {return await [new User()]})
      await expect(votingService.userVote(validHkId,votingOptionId)).rejects.toThrowError(BadRequestException)
      expect(IsUserVotingOptionExistedSpy).toBeCalledTimes(1)
    })

    it('should return an user when user input is valid',async () => {
      let validHkId = "F4917401";
      let votingOptionId = "votingOptionId"
      let user = new User();
      let votingOption = new VotingOptions("item1");
      votingOption.id = "1111";
      user.hkId = ""
      jest.mock('dayjs', () =>
        jest.fn((...args) => jest.requireActual('dayjs')(args.filter((arg) => arg).length > 0 ? args : '2020-08-12')),
      );
    
      process.env.HASH_SALT_KEY = "random_salt"
      let endVoting:Voting = new Voting();
      endVoting.end = new Date(2021,12,10);

      votingService.IsVotingOptionExisted = jest.fn(async(votingOptionId) => {return await true});
      votingService.findVotingOption = jest.fn(async(votingOptionId) => {return await votingOption});
      votingRepository.getVotingByVotingOptionId = jest.fn(async (votingOptionId) => { return await endVoting});
      userRepository.getUserByIdAndVotingId = jest.fn(async(hkId: string, voting: string) => {return await null})
      userRepository.findByHKID = jest.fn(async(hkId: string) => {return await null})
      userRepository.save = jest.fn(async(hk: User[]) => {return await []})
      userRepository.addVotingOption = jest.fn(async(user: User, votingOption: VotingOptions) => {})
      await expect(votingService.userVote(validHkId,votingOptionId)).resolves.toBe(true)
      expect(userRepository.addVotingOption).toBeCalledTimes(1);
    })
  })
  it('should be defined', () => {
    expect(votingService).toBeDefined();
  });
});
