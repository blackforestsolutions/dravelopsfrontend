import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiToken } from '../../domain/model/api-token';
import { NearestTravelPointFragment } from '../../domain/model/generated';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { TOUCH_BREAKPOINT } from '@dravelopsfrontend/shared';

@Component({
  selector: 'dravelopsefafrontend-journey-search',
  templateUrl: './journey-search.component.html',
  styleUrls: ['./journey-search.component.scss']
})
export class JourneySearchComponent implements OnInit {
  @Output() readonly submitApiTokenEvent = new EventEmitter<ApiToken>();

  selectedDeparture: NearestTravelPointFragment;
  selectedArrival: NearestTravelPointFragment;
  selectedTabIndex = 0;
  isDesktopView$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.isDesktopView$ = this.breakpointObserver.observe(`(min-width: ${TOUCH_BREAKPOINT}px)`).pipe(
      map((breakPointState: BreakpointState) => breakPointState.matches)
    );
  }

  handleDepartureSelectEvent(selectedDeparture: NearestTravelPointFragment): void {
    this.selectedDeparture = selectedDeparture;
  }

  handleArrivalSelectEvent(selectedArrival: NearestTravelPointFragment): void {
    this.selectedArrival = selectedArrival;
  }

  passSubmitApiTokenEvent(apiToken: ApiToken): void {
    this.submitApiTokenEvent.emit(apiToken);
  }
}
