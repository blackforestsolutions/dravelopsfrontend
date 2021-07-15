import { Component, ElementRef, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { JourneyFragment } from '@dravelopsfrontend/generated-content';
import { JourneyListService } from '../services/journey-list.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { scanJourneys } from '../../shared/util/rxjs';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { IsJourneyInPastPipe } from '../pipes/is-journey-in-past-pipe/is-journey-in-past.pipe';
import { ViewportScroller } from '@angular/common';
import { SHOW_JOURNEY_RESULT_MAP } from '../../../environments/config-tokens';

@Component({
  selector: 'dravelopsefafrontend-journey-list-outward',
  templateUrl: './journey-list-outward.component.html',
  styleUrls: ['./journey-list-outward.component.scss']
})
export class JourneyListOutwardComponent implements OnInit, OnDestroy {
  @Output() journeySelectedEvent = new EventEmitter<JourneyFragment>();
  @ViewChild('scrollWrapper', { static: true }) scrollWrapper: ElementRef;
  loading = true;
  expandedJourney: JourneyFragment = null;
  journeys$ = new Subject<JourneyFragment[]>();
  earlierButtonClick$ = new Subject<void>();
  laterButtonClick$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(SHOW_JOURNEY_RESULT_MAP) public readonly showJourneyResultMap: boolean,
    private readonly viewportScroller: ViewportScroller,
    private readonly journeyListService: JourneyListService,
    private readonly route: ActivatedRoute,
    private readonly isOnlyFootpath: IsOnlyFootpathPipe,
    private readonly isJourneyInPast: IsJourneyInPastPipe
  ) {
  }

  ngOnInit(): void {
    this.mergeJourneys();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  isJourneyBuyable(journey: JourneyFragment): boolean {
    if (this.isRoundTrip()) {
      return true;
    }
    if (this.isOnlyFootpath.transform(journey)) {
      return false;
    }
    if (this.isJourneyInPast.transform(journey)) {
      return false;
    }
    return true;
  }

  getIsRoundTripText(): string {
    if (this.isRoundTrip()) {
      return 'Hinfahrt';
    }
    return 'Fahrt';
  }

  getJourneyDateTime(): Date {
    return new Date(+this.route.snapshot.paramMap.get('outwardJourneyDateTime'));
  }

  getJourneyIsArrivalDateTime(): boolean {
    return JSON.parse(this.route.snapshot.paramMap.get('outwardJourneyIsArrivalDateTime'));
  }

  getButtonSelectText(): string {
    if (this.isRoundTrip()) {
      return 'Rückfahrt';
    }
    return 'Kaufen';
  }

  passJourneySelectedEvent(selectedJourney: JourneyFragment): void {
    this.journeySelectedEvent.emit(selectedJourney);
  }

  setExpandedJourney(expandedJourney: JourneyFragment): void {
    this.expandedJourney = expandedJourney;
  }

  private isRoundTrip(): boolean {
    return JSON.parse(this.route.snapshot.paramMap.get('isRoundTrip'));
  }

  private mergeJourneys(): void {
    // working with mock data
    // of([getWaldkirchToFurtwangenJourney(), getFurtwangenToWaldkirchJourney()])
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     delay(2000),
    //     tap(() => this.loading = false)
    //   )
    //   .subscribe((journeys: JourneyFragment[]) => this.journeys$.next(journeys));
    let isNewSearch;
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.journeys$.next(null)),
        tap(() => isNewSearch = true),
        tap(() => this.expandedJourney = null),
        tap(() => this.viewportScroller.scrollToAnchor(this.scrollWrapper.nativeElement.id)),
        switchMap((params: ParamMap) => merge(
          this.getJourneys(params),
          this.getEarlierJourneys(params),
          this.getLaterJourneys(params)
        )),
        scanJourneys(() => isNewSearch),
        tap(() => isNewSearch = false)
      )
      .subscribe((journeys: JourneyFragment[]) => this.journeys$.next(journeys));
  }

  private getJourneys(params: ParamMap): Observable<JourneyFragment | JourneyFragment[]> {
    return this.journeyListService.getOutwardJourneysBy(
      params,
      (loading: boolean) => this.loading = loading
    );
  }

  private getEarlierJourneys(params: ParamMap): Observable<JourneyFragment | JourneyFragment[]> {
    return this.journeys$.pipe(
      // switchMap = only one click is recognized or mergeMap = multiple clicks are recognized
      switchMap((currentJourneys: JourneyFragment[]) => this.earlierButtonClick$.pipe(
        map(() => currentJourneys)
      )),
      mergeMap((currentJourneys: JourneyFragment[]) => this.journeyListService.getEarlierJourneysBy(
        params,
        (loading: boolean) => this.loading = loading,
        currentJourneys
      ))
    );
  }

  private getLaterJourneys(params: ParamMap): Observable<JourneyFragment | JourneyFragment[]> {
    return this.journeys$.pipe(
      // switchMap = only one click is recognized or mergeMap = multiple clicks are recognized
      switchMap((currentJourneys: JourneyFragment[]) => this.laterButtonClick$.pipe(
        map(() => currentJourneys)
      )),
      mergeMap((currentJourneys: JourneyFragment[]) => this.journeyListService.getLaterJourneysBy(
        params,
        (loading: boolean) => this.loading = loading,
        currentJourneys
      ))
    );
  }
}
