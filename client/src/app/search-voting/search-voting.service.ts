import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Voting {
  "id": string,
  "title": string,
  "start": string,
  "end": string,
  "userVoteCount": string
}

@Injectable({
  providedIn: 'root'
})
export class SearchVotingService {
  

  private readonly backendapi: string = `${environment.backendUrl}/voting`

  constructor(private http:HttpClient) { }

  getVoting(start:string,end:string):Observable<Array<Voting>> {
    return this.http.get<Array<Voting>>(`${this.backendapi}/${start}/${end}`);
  }
}
