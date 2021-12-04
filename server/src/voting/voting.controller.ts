import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { User } from 'src/entities/User';
import { Voting } from 'src/entities/Voting';
import { CreateVoteDTO } from 'src/models/dto/requests/create-voting.dto';
import { UserVoteDTO } from 'src/models/dto/requests/user-vote.dto';
import { VotingService } from './voting.service';
import { VotingOptions } from 'src/Entities/VotingOptions';
import dayjs from 'dayjs';


@Controller('voting')
export class VotingController {

    constructor(private votingService:VotingService) {

    }

    @Get()
    @HttpCode(200)
    async allVoting() {
        return await this.votingService.getAllVoting();
    }

    @Post('createVoting')
    @HttpCode(201)
    async createVoting(@Body() request:CreateVoteDTO) : Promise<Voting>{
        let { title,start,end,votingOption} = request;
        let optionsList = votingOption.map((o) => new VotingOptions(o));
        let voting = await this.votingService.createVoting(title,start,end,optionsList);
        return voting;
    }

    @Post('userVote')
    @HttpCode(201)
    async UserVote(@Body() request:UserVoteDTO) : Promise<{message:string}> {
        let isVoteSuccess = await this.votingService.userVote(request.hkId,request.votingOptionId);
        let message = "Your voting is successful";
        message = isVoteSuccess? "Voting fail":message;
        return {
            message: message
        }
    }

    @Get('/votingCount/:votingId')
    async getVotingOptionCount(@Param('votingId') id: string) {
        let votingOptionCount = this.votingService.getVotingOptionWithCount(id);
        return votingOptionCount;
    }

    @Get('/votingResult/:votingId')
    async getVotingOptionCountResult(@Param('votingId') id: string) {
        let voting = await this.votingService.getVoting(id);
        if(dayjs().isBefore(dayjs(voting.end)))
            throw new BadRequestException(`Result can only be displayed after end time:${dayjs(voting.end).format()}`);

        let votingOptionCount = await this.votingService.getEndedVoting(id);
        return votingOptionCount;
    }

    @Get('/votingResult')
    async getAllEndedVotingResult() {
        let votingOptionCount = await this.votingService.getAllVoting(true);
        return votingOptionCount;
    }

    @Get('/:start/:end')
    async getAllEndedVotingResultWithin(@Param('start') start:string, @Param('end') end:string) {
        let result = await this.votingService.getVotingWithin(start,end);
        return result;
    }

    @Get('/mostRecentlyEnded')
    async getMostRecentlyEndedVoting() {
        let result = await this.votingService.getMostRecentlyEndedVoting();
        return result;
    }


}
