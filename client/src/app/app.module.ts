import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AllVotingComponent } from './all-voting/all-voting.component';
import { AllEndedVotingComponent } from './all-ended-voting/all-ended-voting.component';
import { CreateVotingComponent } from './create-voting/create-voting.component';
import { UserVoteComponent } from './user-vote/user-vote.component';
import { RouterModule, Routes } from '@angular/router';
import { VotingCardComponent } from './voting-card/voting-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserIdInputComponent } from './user-id-input/user-id-input.component';
import { FormsModule } from '@angular/forms';
import { MostRecentlyEndedComponent } from './most-recently-ended/most-recently-ended.component';
import { SearchVotingComponent } from './search-voting/search-voting.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    component: AllVotingComponent
  },
  {
    path: 'allVoting',
    component: AllVotingComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AllVotingComponent,
    AllEndedVotingComponent,
    CreateVotingComponent,
    UserVoteComponent,
    VotingCardComponent,
    UserIdInputComponent,
    MostRecentlyEndedComponent,
    SearchVotingComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    NgxDaterangepickerMd.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
