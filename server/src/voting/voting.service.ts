import { BadRequestException, Get, Injectable } from '@nestjs/common';
import { Voting } from 'src/entities/Voting';
import { User } from 'src/entities/User';
import { UserRepository } from 'src/repositories/user.repository';
import { VotingOptions } from 'src/Entities/VotingOptions';
import { VotingRepository } from 'src/repositories/voting.repository';
import * as dayjs from 'dayjs'
import { VotingOptionsRepository } from 'src/repositories/votingOptionRepository';
import { isValidId } from 'src/utils/validateId';
import { signKey } from '../utils/signKey'
@Injectable()
export class VotingService {

    constructor(
        private readonly votingOptionRepository: VotingOptionsRepository,  
        private readonly votingRepository: VotingRepository,
        private readonly userRepository: UserRepository
    ) {

    }

    async getAllVoting(isAfterEndTime?:boolean) {
        let result = await this.votingRepository.getAllVoting(isAfterEndTime);
        let resultList = [];
        Object.entries(result).map(([key, value]) => {
            let obj = {};
            if(result[key].length === 0) return;
            console.log(result[key][0]['votingId'])
            obj['id'] = value[0]['votingId'];
            obj['title'] = value[0]['votingTitle'];
            obj['end'] = value[0]['end']
            obj['start'] = value[0]['start']
            obj['option'] = value.map(o => (
                {
                    value:o['value'], 
                    count:o['usersCount']
                }
            ));
            resultList.push(obj)
        })
        return resultList
    }
    
    async userVote(hkId, votingOptionId):Promise<boolean> {

        if(!isValidId(hkId))
            throw new BadRequestException('Invalid HKID');


        let isVotingOptionExisted = await this.IsVotingOptionExisted(votingOptionId);
        if(!isVotingOptionExisted)     
            throw new BadRequestException('Invalid voting option');

        let voting = await this.getVotingByVotingOptionId(votingOptionId);
        let isEarlierThanVotingEndTime = await this.isEarlierThanEndTimeOf(voting,dayjs())
        // let isEarlierThanVotingEndTime = await this.isEarlierThanVotingEndTime(votingOptionId)
        if(!isEarlierThanVotingEndTime)
            throw new BadRequestException('Voting cannot not be voted after endtime');

        const hash = signKey(process.env.HASH_SALT_KEY,hkId);
    
        let isUserAlreadyVoting = await this.IsUserVotingOptionExisted(hash,  votingOptionId);

        if(isUserAlreadyVoting)
            throw new BadRequestException('Duplicate vote for the user');
        let isSucessful = await this.createUserVotingOption(hash,votingOptionId);
        return isSucessful
    }

    async createUserVotingOption(hkId:string,votingOptionId:string): Promise<boolean> {
        let user = await this.userRepository.findByHKID(hkId);
        if(!user) {
            user = new User()
            user.hkId = hkId;
            user.options = [];
            user = await this.userRepository.save(user);
        }
        let votingOption = await this.findVotingOption(votingOptionId);
        if(!votingOption) return false;
        
        await this.userRepository.addVotingOption(user, votingOption);
        return true;
    }

    async findVotingOption(id:string) {
        return await this.votingOptionRepository.findOne(id);
    }

    async createVoting(title:string,start:Date,end:Date,votingOption:VotingOptions[]): Promise<Voting> {
        let insertItem = new Voting(title,start,end,votingOption);
        insertItem = await this.votingRepository.save(insertItem);
        return insertItem;
    }

    async IsUserVotingOptionExisted(hkId:string,votingOptionId:string): Promise<boolean> {
        let voting = await this.votingRepository.getVotingByVotingOptionId(votingOptionId);
        if(!voting)
            throw 'Invalid voting option';
 
        let users = await this.userRepository.getUserByIdAndVotingId(hkId,voting.id)
        if(!users || users?.length === 0 ) return false
            return true;
    }

    async isEarlierThanVotingEndTime(votingOptionId:string):Promise<boolean> {
        let voting = await this.votingRepository.getVotingByVotingOptionId(votingOptionId);
        if(!voting) 
            throw 'Invalid voting';
        let now = dayjs();
        let end = dayjs(voting.end);
        return now.isBefore(end);
    }

    isEarlierThanEndTimeOf(voting:Voting,dateTime:dayjs.Dayjs) {
        return dateTime.isBefore(voting.end);
    }

    async IsVotingOptionExisted(votingOptionId:string):Promise<boolean> {
        let votingOption = await this.votingOptionRepository.findOne(votingOptionId);
        if(!votingOption) return false;
        return true;
    }

    async getVotingOptionWithCount(votingId:string):Promise<any[]> {
        return await this.votingRepository.getVotingOptionWithCount(votingId);
    }

    async getEndedVoting(votingId:string) {
        return await this.votingRepository.getEndedVoting(votingId);
    }

    async getAllEndedVoting() {
        let result = await this.votingRepository.getAllEndedVoting();
        let resultList = [];
        Object.entries(result).map(([key, value]) => {
            let obj = {};
            if(result[key].length === 0) return;
            console.log(result[key][0]['votingId'])
            obj['id'] = result[key][0]['votingId'];
            obj['title'] = result[key][0]['votingTitle'];
            obj['end'] = result[key][0]['end']
            obj['start'] = result[key][0]['start']
            obj['option'] = result[key].map(o => (
                {
                    value:o['value'], 
                    count:o['usersCount']
                }
            ));
            resultList.push(obj)
        })
        return resultList
    }

    async getVoting(votingId:string):Promise<Voting> {
        return await this.votingRepository.findOne(votingId);
    }

    async getVotingWithin(start:string,end:string){
        let result = await this.votingRepository.getAllVotingWithin(start,end); 
        return result;
    }

    async getMostRecentlyEndedVoting():Promise<Voting> {
        return await this.votingRepository.getMostRecentlyEndedVoting();
    }

    async getVotingByVotingOptionId(votingOptionId:string) {
        return await this.votingRepository.getVotingByVotingOptionId(votingOptionId);
    }

}
