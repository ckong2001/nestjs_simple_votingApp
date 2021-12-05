import { VotingOption } from "../all-ended-voting/all-ended-voting.service";

export interface Voting {
  id: string;
  title: string;
  start:string;
  end:string;
  option: Array<VotingOption>;
};
  
