import { User } from "src/entities/User";
import { VotingOptions } from "src/Entities/VotingOptions";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findByHKID(hkId: string ): Promise<User> {
        let user = await this.findOne({
            hkId: hkId
        });
        return user;
    }

    async createUser(hkId:string, votingOptions?: VotingOptions[]): Promise<User> {

        let user = new User();
        user.hkId = hkId ; 
        if(votingOptions)
            user.options = [...votingOptions];
        user = await this.create(user);
        return user;
    }

    async getUserByIdAndVotingId(hkId:string, voting:string) {
        let result = await this.createQueryBuilder('user')
            .leftJoinAndSelect(
                'user.options',
                'votingOptions')
            .leftJoinAndSelect(
                'votingOptions.voting',
                'voting'
            )
            .where('user.hkId = :id', { id: hkId })
            .andWhere("voting.id = :votingId", { votingId: voting })
            .getMany();
        return result
    }

    // async IsUserVotedForVoting(hkId:string, voting:string):Promise<boolean> {
        
    //     let result = await this.createQueryBuilder('user')
    //     .leftJoinAndSelect(
    //         'user.options',
    //         'votingOptions')
    //     .leftJoinAndSelect(
    //         'votingOptions.voting',
    //         'voting'
    //     )
    //     .where('user.hkId = :id', { id: hkId })
    //     .andWhere("voting.id = :votingId", { votingId: voting })
    //     .getMany();
    //     if(!result || result?.length === 0 ) return false
    //     return true;
    // }

    async addVotingOption(user:User , votingOption:VotingOptions){
        await this.createQueryBuilder()
                .relation(User, "options")
                .of(user)
                .add(votingOption);
    }

}
