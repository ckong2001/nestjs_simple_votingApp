import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVotingComponent } from './all-voting.component';

describe('AllVotingComponent', () => {
  let component: AllVotingComponent;
  let fixture: ComponentFixture<AllVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
