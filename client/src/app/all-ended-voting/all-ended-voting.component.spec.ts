import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEndedVotingComponent } from './all-ended-voting.component';

describe('AllEndedVotingComponent', () => {
  let component: AllEndedVotingComponent;
  let fixture: ComponentFixture<AllEndedVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEndedVotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEndedVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
