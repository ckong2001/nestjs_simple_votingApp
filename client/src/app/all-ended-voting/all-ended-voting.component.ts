import { Component, OnInit } from '@angular/core';
import { AllEndedVotingService } from './all-ended-voting.service';

import { EndedVoting } from './all-ended-voting.service'
@Component({
  selector: 'app-all-ended-voting',
  templateUrl: './all-ended-voting.component.html',
  styleUrls: ['./all-ended-voting.component.scss']
})
export class AllEndedVotingComponent implements OnInit {

  constructor(private allEndedVotingService:AllEndedVotingService) { }
  allEndedVoting = Array<EndedVoting>();

  ngOnInit(): void {
    this.allEndedVotingService.getAllEndedVotings().subscribe(res => {
      this.allEndedVoting = res;
      this.allEndedVoting = this.allEndedVoting.map(o => ({...o,start: new Date(o.start).toLocaleString(),end: new Date(o.end).toLocaleString()}))
    })
  }

}
