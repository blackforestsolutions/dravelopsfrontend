import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { JourneyFragment } from '../../domain/model/generated';
import { map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { JourneyListService } from '../services/journey-list.service';
import { BackwardJourneyFilterPipe } from '../pipes/backward-journey-filter-pipe/backward-journey-filter.pipe';
import { scanJourneys } from '../../domain/util/rxjs';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { IsJourneyInPastPipe } from '../pipes/is-journey-in-past-pipe/is-journey-in-past.pipe';
import { ViewportScroller } from '@angular/common';
import { SHOW_JOURNEY_RESULT_MAP } from '@dravelopsfrontend/shared';

@Component({
  selector: 'dravelopsefafrontend-journey-list-backward',
  templateUrl: './journey-list-backward.component.html',
  styleUrls: ['./journey-list-backward.component.scss']
})
export class JourneyListBackwardComponent implements OnInit, OnDestroy {
  @Input() selectedOutwardJourney: JourneyFragment;
  @Output() journeySelectedEvent = new EventEmitter<JourneyFragment>();
  @ViewChild('scrollWrapper', { static: true }) scrollWrapper: ElementRef;
  loading = true;
  expandedJourney: JourneyFragment;
  journeys$ = new Subject<JourneyFragment[]>();
  earlierJourneysAvailable = true;
  earlierButtonClick$ = new Subject<void>();
  laterButtonClick$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(SHOW_JOURNEY_RESULT_MAP) public readonly showJourneyResultMap: boolean,
    private readonly viewportScroller: ViewportScroller,
    private readonly journeyListService: JourneyListService,
    private readonly route: ActivatedRoute,
    private readonly backwardJourneyFilter: BackwardJourneyFilterPipe,
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
    if (this.isJourneyInPast.transform(this.selectedOutwardJourney) || this.isJourneyInPast.transform(journey)) {
      return false;
    }
    if (this.isOnlyFootpath.transform(this.selectedOutwardJourney) && this.isOnlyFootpath.transform(journey)) {
      return false;
    }
    return true;
  }

  getJourneyDateTime(): Date {
    return new Date(+this.route.snapshot.paramMap.get('backwardJourneyDateTime'));
  }

  getJourneyIsArrivalDateTime(): boolean {
    return JSON.parse(this.route.snapshot.paramMap.get('backwardJourneyIsArrivalDateTime'));
  }

  passJourneySelectedEvent(journey: JourneyFragment): void {
    this.journeySelectedEvent.emit(journey);
  }

  setExpandedJourney(expandedJourney: JourneyFragment): void {
    this.expandedJourney = expandedJourney;
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
    return this.journeyListService.getBackwardJourneysBy(
      params,
      (loading: boolean) => this.loading = loading
    );
  }

  private getEarlierJourneys(params: ParamMap): Observable<JourneyFragment | JourneyFragment[]> {
    return this.journeys$.pipe(
      map((currentJourneys: JourneyFragment[]) => this.backwardJourneyFilter.transform(currentJourneys, this.selectedOutwardJourney)),
      // switchMap = only one click is recognized or mergeMap = multiple clicks are recognized
      switchMap((currentJourneys: JourneyFragment[]) => this.earlierButtonClick$.pipe(
        map(() => currentJourneys)
      )),
      mergeMap((currentJourneys: JourneyFragment[]) => this.journeyListService.getEarlierJourneysBy(
        params,
        (loading: boolean) => this.loading = loading,
        currentJourneys
      )),
      tap((earlierJourneys: JourneyFragment | JourneyFragment[]) => this.areMoreAvailable(earlierJourneys))
    );
  }

  private areMoreAvailable(earlierJourneys: JourneyFragment | JourneyFragment[]): void {
    if (Array.isArray(earlierJourneys)) {
      const filteredJourneys: JourneyFragment[] = this.backwardJourneyFilter.transform(earlierJourneys, this.selectedOutwardJourney);
      if (earlierJourneys.length !== filteredJourneys.length) {
        this.earlierJourneysAvailable = false;
      }
    }
  }

  private getLaterJourneys(params: ParamMap): Observable<JourneyFragment | JourneyFragment[]> {
    return this.journeys$.pipe(
      map((currentJourneys: JourneyFragment[]) => this.backwardJourneyFilter.transform(currentJourneys, this.selectedOutwardJourney)),
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
