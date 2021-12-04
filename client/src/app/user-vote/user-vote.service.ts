import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VotingOption } from './voting-option';

@Injectable({
  providedIn: 'root'
})
export class UserVoteService {
  private readonly backendapi: string = `${environment.backendUrl}/voting/votingCount`
  constructor(private http:HttpClient) { 
  }

  getVotingOption(votingId: string):Observable<Array<VotingOption>> {
    return this.http.get<Array<VotingOption>>(`${this.backendapi}/${votingId}`)
  }

  userVote(votingOptionId:string, userHkId:string) {
    return this.http.post(`${environment.backendUrl}/voting/userVote`, { hkId: userHkId , votingOptionId:votingOptionId})
  }
}
