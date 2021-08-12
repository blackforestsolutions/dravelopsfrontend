import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyFragment } from '../../domain/model/generated';
import { takeUntil } from 'rxjs/operators';

const BOOKING_PATH = '/booking';

@Component({
  selector: 'dravelopsefafrontend-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss']
})
export class JourneyListComponent implements OnInit, OnDestroy {
  selectedOutwardJourney: JourneyFragment;

  private destroy$ = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.resetComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleOutwardJourneySelectedEvent(journey: JourneyFragment): void {
    const isRoundTrip: boolean = JSON.parse(this.route.snapshot.paramMap.get('isRoundTrip'));
    if (isRoundTrip) {
      this.selectedOutwardJourney = journey;
    } else {
      this.router.navigate([BOOKING_PATH, isRoundTrip, journey.id]);
    }
  }

  handleBackwardJourneySelectedEvent(journey: JourneyFragment): void {
    const isRoundTrip: boolean = JSON.parse(this.route.snapshot.paramMap.get('isRoundTrip'));
    if (journey) {
      this.router.navigate([BOOKING_PATH, isRoundTrip, this.selectedOutwardJourney.id, journey.id]);
    } else {
      this.router.navigate([BOOKING_PATH, false, this.selectedOutwardJourney.id]);
    }
  }

  private resetComponent(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.selectedOutwardJourney = null);
  }
}
