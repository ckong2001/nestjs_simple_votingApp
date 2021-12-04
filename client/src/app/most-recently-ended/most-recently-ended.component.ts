import { Component, OnInit } from '@angular/core';
import { MostRecentlyEndedService, RecentlyEndedVoting } from './most-recently-ended.service';

@Component({
  selector: 'app-most-recently-ended',
  templateUrl: './most-recently-ended.component.html',
  styleUrls: ['./most-recently-ended.component.scss']
})
export class MostRecentlyEndedComponent implements OnInit {

  constructor(private mostRecentlyEndedService:MostRecentlyEndedService) { }
  public recentlyEndedVoting!:RecentlyEndedVoting;
  
  ngOnInit(): void {
    this.mostRecentlyEndedService.getMostRecentlyEndedVoting().subscribe(res => {
      this.recentlyEndedVoting = res;
    })
  }

}
