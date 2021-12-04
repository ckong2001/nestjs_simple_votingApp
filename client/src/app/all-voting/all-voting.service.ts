import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Voting } from './voting';

@Injectable({
  providedIn: 'root'
})
export class AllVotingService {
  private readonly backendapi: string = `${environment.backendUrl}/voting`

  constructor(private http:HttpClient) { }

  getAllVotings() :Observable<Array<Voting>> {
    return this.http.get<Array<Voting>>(this.backendapi);
  }

}
