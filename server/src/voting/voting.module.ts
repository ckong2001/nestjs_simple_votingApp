import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Voting } from 'src/entities/Voting';
import { VotingOptions } from 'src/entities/VotingOptions';
import { UserRepository } from 'src/repositories/user.repository';
import { VotingRepository } from 'src/repositories/voting.repository';
import { VotingOptionsRepository } from 'src/repositories/votingOptionRepository';
import { VotingController } from './voting.controller';
import { VotingService } from './voting.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([VotingRepository,VotingOptionsRepository,UserRepository])
  ],
  controllers: [VotingController],
  providers: [VotingService],
  exports:[VotingService]
})
export class VotingModule {}
