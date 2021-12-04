import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserVoteService } from '../user-vote/user-vote.service';
import { VotingOption } from '../user-vote/voting-option';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-user-id-input',
  templateUrl: './user-id-input.component.html',
  styleUrls: ['./user-id-input.component.scss']
})
export class UserIdInputComponent implements OnInit {

  @Input() votingOption!: VotingOption;

  @Input() hkId:any;
  public errorMsg!:string;
  constructor(private userVoteService:UserVoteService,public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  async onSubmit() {  
    this.userVoteService.userVote(this.votingOption.votingOptionId,this.hkId).subscribe(res =>{
      this.modal.close();
    }, error => {
      this.errorMsg = error['error']['message']
    })
  }

  onRealTimeSubmit() {
    this.userVoteService.userVoteInSocket(this.votingOption.votingOptionId,this.hkId);
  }

}
