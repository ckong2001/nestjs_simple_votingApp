import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface RecentlyEndedVoting {
  "title": string,
  "start": string,
  "end": string,
  "options": Array<{
    "votingOptionId": string,
    "value": string,
    "usersCount": string
  }>,
  "id": string
}
@Injectable({
  providedIn: 'root'
})
export class MostRecentlyEndedService {


  private readonly backendapi: string = `${environment.backendUrl}/voting/mostRecentlyEnded`

  constructor(private http:HttpClient) { }

  getMostRecentlyEndedVoting() :Observable<RecentlyEndedVoting> {
    return this.http.get<RecentlyEndedVoting>(this.backendapi);
  }

}
