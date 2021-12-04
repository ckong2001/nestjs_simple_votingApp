import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { AllVotingService } from './all-voting.service';
import { Voting } from './voting';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserVoteComponent } from '../user-vote/user-vote.component'
import { timer } from 'rxjs/internal/observable/timer';
import { of } from 'rxjs/internal/observable/of';


@Component({
  selector: 'app-all-voting',
  templateUrl: './all-voting.component.html',
  styleUrls: ['./all-voting.component.scss']
})
export class AllVotingComponent implements OnInit, OnDestroy {

  constructor(private http:HttpClient,private votingService:AllVotingService,private modalService: NgbModal
    ) { }

  private ngUnsubscribe = new Subject();
  private pollingSeconds = 2;
  private pollingInterval = this.pollingSeconds * 1000;
  votings :Array<Voting> | undefined = new Array<Voting>() ; 

  ngOnInit(): void {
    timer(0, this.pollingInterval)
      .pipe(
        switchMap(() => {
          return this.votingService.getAllVotings()
            .pipe(catchError(err => {
              // Handle errors
              alert(err);
              return of(undefined);
            }));
        }),
        filter(data => data !== undefined)
      )
      .subscribe(data => {
        this.votings = data;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

  }

  onTitleClick(voting:Voting) {
    let modal =  this.modalService.open(UserVoteComponent,{centered:true});
    modal.componentInstance.voting = voting;
  }

}

