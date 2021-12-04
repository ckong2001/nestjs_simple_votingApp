import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotingController } from './voting/voting.controller';
import { VotingModule } from './voting/voting.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    VotingModule
  ],
  controllers: [AppController,VotingController],
  providers: [AppService],
})
export class AppModule {}
/** */