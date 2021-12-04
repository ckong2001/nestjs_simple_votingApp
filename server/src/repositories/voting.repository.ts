import { Voting } from "src/entities/Voting";
import {EntityRepository, Repository} from "typeorm";
import * as dayjs from 'dayjs'
import * as _ from 'lodash'
import { VotingOptions } from "src/entities/VotingOptions";
@EntityRepository(Voting)
export class VotingRepository extends Repository<Voting> {
    async getVotingByVotingOptionId(votingOptionId:string) {
        let result = await this.createQueryBuilder('voting')
        .leftJoinAndSelect(
            'voting.options',
            'votingOptions'
        )
        .where('votingOptions.id = :votingOptionId', {votingOptionId:votingOptionId })
        .getOne()
        return result;
    }

    async getVotingOptionWithCount(votingId:string) {

        let query = this.createQueryBuilder('voting')
                    .leftJoin(
                        'voting.options',
                        'votingOptions'
                    )
                    .leftJoin(
                        'votingOptions.users',
                        'User'
                    )
                    .select(['votingOptions.id as votingOptionId','votingOptions.value as value'])
                    .addSelect('COUNT(userId) as usersCount')
                    .where('voting.id = :id', {id :votingId})
                    .groupBy('votingOptions.id');

        let result = await query.getRawMany();
        return result;
    }

    async getEndedVoting(votingId:string) {
        let query = this.createQueryBuilder('voting')
                        .innerJoin(
                            'voting.options',
                            'votingOptions'
                        )
                        .innerJoin(
                            'votingOptions.users',
                            'User'
                        )
                        .select(['votingOptions.id as id','votingOptions.value as value'])
                        .addSelect('COUNT(userId) as usersCount')
                        .andWhere('voting.id = :id', {id :votingId})
                        .groupBy('votingOptions.id');
        let result = await query.getRawMany();
        result = result.reduce((prev, current) => (parseInt(prev.usersCount) > parseInt(current.usersCount)) ? prev : current)
        return result;

    }

    async getAllEndedVoting() {
        let query = this.createQueryBuilder('voting')
                        .innerJoin(
                            'voting.options',
                            'votingOptions'
                        )
                        .leftJoin(
                            'votingOptions.users',
                            'User'
                        )
                        .select(
                            ['voting.id as votingId', 'voting.title as votingTitle','votingOptions.id as id',
                            'votingOptions.value as value','voting.start as start','voting.end as end']
                        )
                        .addSelect('COUNT(userId) as usersCount')
                        .where('voting.end < :endTime', {endTime: dayjs().format()})
                        .groupBy('votingOptions.id');
        let sqlResult = await query.getRawMany();
        let result = _.groupBy(sqlResult,'votingId')
        return result;
    }


    async getAllVoting(isAfterEndTime?:boolean) {
        let query = this.createQueryBuilder('voting')
                        .innerJoin(
                            'voting.options',
                            'votingOptions'
                        )
                        .leftJoin(
                            'votingOptions.users',
                            'User'
                        )
                        .select(
                            ['voting.id as votingId', 'voting.title as votingTitle','votingOptions.id as id',
                            'votingOptions.value as value','voting.start as start','voting.end as end']
                        )
                        .addSelect('COUNT(userId) as usersCount')
        if(isAfterEndTime)        
            query.where('voting.end < :endTime', {endTime: dayjs().format()})
        query.groupBy('votingOptions.id');
        let sqlResult = await query.getRawMany();
        let result = _.groupBy(sqlResult,'votingId')
        return result;
    }



    async getAllVotingWithin(start:string, end:string) {

        /*
            Get  each voting with voting option of max number of votes
            SELECT COUNT(user_options_voting_options.votingOptionsId), VotingOptions.votingId, VotingOptions.value as COUNT  FROM VotingOptions
            JOIN user_options_voting_options on 
            user_options_voting_options.votingOptionsId = VotingOptions.Id
            JOIN Voting on Voting.id = VotingOptions.votingId
            Group BY Voting.id , user_options_voting_options.votingOptionsId
            having count(*) = (
                SELECT MAX(COUNT) FROM (SELECT COUNT(user_options_voting_options.votingOptionsId) as COUNT,Voting.Id as Id  FROM VotingOptions
                JOIN user_options_voting_options on 
                user_options_voting_options.votingOptionsId = VotingOptions.Id
                JOIN Voting on Voting.id = VotingOptions.votingId
                Group BY user_options_voting_options.votingOptionsId
                ) as result GROUP BY Id HAVING Id = Voting.id LIMIT 1
            ) 
        */

        return await this.createQueryBuilder('voting')
                        .addSelect(subQuery => {        
                            return subQuery            
                                 .select('Count(votingOptions.id)')            
                                 .from(VotingOptions,'votingOptions')
                                 .innerJoin(
                                    'votingOptions.users',
                                    'User'
                                )
                                .where('votingOptions.votingId = voting.id')
                            }, 'userVoteCount'
                        )
                        .addSelect("voting.id","id")
                        .addSelect("voting.title","title")
                        .addSelect("voting.start","start")
                        .addSelect("voting.end","end")
                        .where('voting.end =< :endTime', {endTime: end})
                        .where('voting.start >= :startTime', {startTime:start})
                        .orderBy('userVoteCount',"DESC")
                        .getRawMany();
    }

    async getMostRecentlyEndedVoting() {
        


        let now = dayjs().format();
        let voting = await this.createQueryBuilder('voting')
                        .where('voting.end < :endTime', {endTime: now})
                        .orderBy('voting.end','DESC')
                        .getOne();
        let votingOption = await this.getVotingOptionWithCount(voting.id)
        voting['options'] = votingOption;
        return voting;
    }


}