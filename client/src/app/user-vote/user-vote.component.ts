import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Voting } from '../all-voting/voting';
import { UserIdInputComponent } from '../user-id-input/user-id-input.component';
import { UserVoteService } from './user-vote.service';
import { VotingOption } from './voting-option';

@Component({
  selector: 'app-user-vote',
  templateUrl: './user-vote.component.html',
  styleUrls: ['./user-vote.component.scss']
})
export class UserVoteComponent implements OnInit {

  @Input() voting!: Voting;
  private ngUnsubscribe = new Subject();

  public votingOptions: Array<VotingOption> = new Array<VotingOption>();
  public userId!: string;

  constructor(public modal: NgbActiveModal,private userVoteService:UserVoteService,private modalService: NgbModal) { 

  }

  ngOnInit(): void {
    this.userVoteService.getVotingOption(this.voting.id).pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(voting => {
      this.votingOptions = voting;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onOptionClick(votingOption:VotingOption) {
    this.modal.close()
    let modal = this.modalService.open(UserIdInputComponent,{centered:true})
    modal.componentInstance.votingOption = votingOption;
  }



}
