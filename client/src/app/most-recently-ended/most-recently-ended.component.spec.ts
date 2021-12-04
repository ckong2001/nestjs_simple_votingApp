import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentlyEndedComponent } from './most-recently-ended.component';

describe('MostRecentlyEndedComponent', () => {
  let component: MostRecentlyEndedComponent;
  let fixture: ComponentFixture<MostRecentlyEndedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostRecentlyEndedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostRecentlyEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
