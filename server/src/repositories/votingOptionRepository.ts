import { VotingOptions } from "../entities/VotingOptions";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(VotingOptions)
export class VotingOptionsRepository extends Repository<VotingOptions> {
}