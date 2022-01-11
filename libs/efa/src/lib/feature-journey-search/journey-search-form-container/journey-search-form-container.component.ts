import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import {
  LocationType,
  TravelPointSearchComponent,
  TravelPointSearchParams,
  TravelPointSearchResult,
  TravelPointSearchType
} from '../travel-point-search/travel-point-search.component';
import { TOUCH_BREAKPOINT } from '@dravelopsfrontend/shared';
import { takeUntil } from 'rxjs/operators';
import { NearestTravelPointFragment } from '../../domain/model/generated';
import { ApiToken } from '../../domain/model/api-token';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'dravelopsefafrontend-journey-search-form-container',
  templateUrl: './journey-search-form-container.component.html',
  styleUrls: ['./journey-search-form-container.component.scss']
})
export class JourneySearchFormContainerComponent implements OnDestroy {
  @Input() travelPointSearchType: TravelPointSearchType = 'autocomplete';
  @Input() departureTravelPoint: NearestTravelPointFragment;
  @Input() arrivalTravelPoint: NearestTravelPointFragment;
  @Output() readonly submitApiTokenEvent = new EventEmitter<ApiToken>();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleSubmitApiTokenEvent(apiToken: ApiToken): void {
    this.submitApiTokenEvent.emit(apiToken);
  }

  handleOpenTravelPointSearchEvent(locationType: LocationType): void {
    const isTouchView: boolean = this.breakpointObserver.isMatched(`(max-width: ${TOUCH_BREAKPOINT}px)`);
    if (isTouchView) {
      this.openDialog(locationType);
    }
  }

  private openDialog(locationType: LocationType): void {
    this.dialog
      .open<TravelPointSearchComponent, TravelPointSearchParams, TravelPointSearchResult>(
        TravelPointSearchComponent,
        {
          height: '100%',
          width: '100%',
          maxHeight: '100vh',
          maxWidth: '100vw',
          autoFocus: false,
          panelClass: 'nearest-travel-point-search-touch',
          data: {
            locationType,
            searchType: this.travelPointSearchType
          }
        })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedTravelPoints: TravelPointSearchResult) => this.closeDialog(selectedTravelPoints));
  }

  private closeDialog(selectedTravelPoints: TravelPointSearchResult): void {
    if (!selectedTravelPoints) {
      return;
    }
    if (selectedTravelPoints.departureTravelPoint) {
      this.departureTravelPoint = selectedTravelPoints.departureTravelPoint;
    }
    if (selectedTravelPoints.arrivalTravelPoint) {
      this.arrivalTravelPoint = selectedTravelPoints.arrivalTravelPoint;
    }
  }
}
