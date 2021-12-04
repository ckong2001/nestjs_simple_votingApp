import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEndedVotingComponent } from './all-ended-voting/all-ended-voting.component';
import { AllVotingComponent } from './all-voting/all-voting.component';
import { MostRecentlyEndedComponent } from './most-recently-ended/most-recently-ended.component';
import { SearchVotingComponent } from './search-voting/search-voting.component';

const routes: Routes = [
  { path: 'all', component: AllVotingComponent },
  { path: 'endedVoting', component: AllEndedVotingComponent },
  { path: 'mostRecentlyEnded', component: MostRecentlyEndedComponent },
  { path: 'search', component: SearchVotingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
