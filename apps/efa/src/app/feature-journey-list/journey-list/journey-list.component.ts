import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyFragment } from '../../shared/model/generated';
import { takeUntil } from 'rxjs/operators';

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
      this.router.navigate(['/booking', isRoundTrip, journey.id]);
    }
  }

  handleBackwardJourneySelectedEvent(journey: JourneyFragment): void {
    const isRoundTrip: boolean = JSON.parse(this.route.snapshot.paramMap.get('isRoundTrip'));
    this.router.navigate(['/booking/', isRoundTrip, this.selectedOutwardJourney.id, journey.id]);
  }

  private resetComponent(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.selectedOutwardJourney = null);
  }
}
