import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { VotingRepository } from '../repositories/voting.repository';
import { VotingOptionsRepository } from '../repositories/votingOptionRepository';
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
