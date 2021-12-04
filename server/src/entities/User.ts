import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VotingOptions } from './VotingOptions';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
	hkId:	string

    // @ManyToMany(() => VotingOptions,{ cascade: ['insert', 'update'] })
    @ManyToMany(() => VotingOptions, votingOption => votingOption.users)
    @JoinTable()
    options: VotingOptions[];

    addVotingOption(item:VotingOptions) {
        if(!this.options) {
            this.options = Array<VotingOptions>();
        }
        this.options.push(item);
    }

}