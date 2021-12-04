import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { UserVoteComponent } from '../user-vote/user-vote.component';
import { SearchVotingService, Voting } from './search-voting.service';

@Component({
  selector: 'app-search-voting',
  templateUrl: './search-voting.component.html',
  styleUrls: ['./search-voting.component.scss']
})
export class SearchVotingComponent implements OnInit {

  public votings!: Array<Voting>;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }

  selected: any;

  constructor(private searchVotingService:SearchVotingService,private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  choosedDate(event:any) {
    console.log(event)
  }

  onSearchClick() {
    console.log(this.selected)
    let start = this.selected.startDate.toISOString();
    let end = this.selected.endDate.toISOString();
    this.searchVotingService.getVoting(start,end).subscribe(res => {
      this.votings = res;
    })
  }

  onTitleClick(voting:Voting) {
    let modal =  this.modalService.open(UserVoteComponent,{centered:true});
    modal.componentInstance.voting = voting;
  }



}
