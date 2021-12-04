import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EndedVoting {
  id: string;
  title: string;
  start:string;
  end:string;
  option: Array<VotingOption>;
}

export interface VotingOption {
  value: string,
  count: string
}

@Injectable({
  providedIn: 'root'
})
export class AllEndedVotingService {


  private readonly backendapi: string = `${environment.backendUrl}/voting/votingResult`

  constructor(private http:HttpClient) { }

  getAllEndedVotings() :Observable<Array<EndedVoting>> {
    return this.http.get<Array<EndedVoting>>(this.backendapi);
  }

}
