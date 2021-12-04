import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVotingComponent } from './search-voting.component';

describe('SearchVotingComponent', () => {
  let component: SearchVotingComponent;
  let fixture: ComponentFixture<SearchVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
