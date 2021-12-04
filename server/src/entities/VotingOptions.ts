import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Voting } from './Voting';

@Entity('VotingOptions')
export class VotingOptions {

    constructor(value:string) {
        this.value = value;
    }
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ApiProperty()
    @Column()
	value:	string

    @ManyToOne(() => Voting, voting => voting.options)
    voting: Voting;

    @ManyToMany(() => User,user => user.options)
    @JoinTable()
    users: User[];
  

}