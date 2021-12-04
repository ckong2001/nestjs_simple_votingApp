import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VotingOptions } from './VotingOptions';

@Entity('Voting')
export class Voting {

    constructor(title?,start?,end?,options?) {
        this.title = title;
        this.start = start;
        this.end = end;
        this.options = options;
    }
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
	title:	string

    @Column({ 
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP()',
    })
    start: Date;

    @Column({ type: 'timestamp' })
	end: Date
   
    @OneToMany(() => VotingOptions, votingOption => votingOption.voting,{ cascade: ['insert', 'update'] })
    options: VotingOptions[];

}