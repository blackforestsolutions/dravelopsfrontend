import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../domain/model/generated';
import { TOUCH_BREAKPOINT } from '@dravelopsfrontend/shared';

export type TravelPointSearchType = 'map' | 'autocomplete';
export type LocationType = 'departure' | 'arrival';

export interface TravelPointSearchParams {
  searchType: TravelPointSearchType;
  locationType: LocationType;
}

export interface TravelPointSearchResult {
  departureTravelPoint?: AutocompleteAddressFragment | NearestTravelPointFragment;
  arrivalTravelPoint?: AutocompleteAddressFragment | NearestTravelPointFragment;
}

@Component({
  selector: 'dravelopsefafrontend-travel-point-search',
  templateUrl: './travel-point-search.component.html',
  styleUrls: ['./travel-point-search.component.scss']
})
export class TravelPointSearchComponent implements OnInit, OnDestroy {
  departure$ = new BehaviorSubject<AutocompleteAddressFragment | NearestTravelPointFragment>(null);
  arrival$ = new BehaviorSubject<AutocompleteAddressFragment | NearestTravelPointFragment>(null);

  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogParams: TravelPointSearchParams,
    private dialogRef: MatDialogRef<TravelPointSearchComponent, TravelPointSearchResult>,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.closeDialogOnLaptopView();
    this.closeDialog();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private closeDialogOnLaptopView(): void {
    this.breakpointObserver.observe(`(min-width: ${TOUCH_BREAKPOINT}px)`)
      .pipe(
        takeUntil(this.destroy$),
        filter((breakPointState: BreakpointState) => breakPointState.matches)
      )
      .subscribe(() => this.dialogRef.close());
  }

  private closeDialog(): void {
    if (this.dialogParams.searchType === 'autocomplete' && this.dialogParams.locationType === 'departure') {
      this.closeDialogWithDeparture();
    }
    if (this.dialogParams.searchType === 'autocomplete' && this.dialogParams.locationType === 'arrival') {
      this.closeDialogWithArrival();
    }
    if (this.dialogParams.searchType === 'map') {
      this.closeDialogWithDepartureAndArrival();
    }
  }

  private closeDialogWithDeparture(): void {
    this.departure$
      .pipe(
        takeUntil(this.destroy$),
        filter((departureTravelPoint: AutocompleteAddressFragment) => !!departureTravelPoint))
      .subscribe((departureTravelPoint: AutocompleteAddressFragment) => this.dialogRef.close({ departureTravelPoint }));
  }

  private closeDialogWithArrival(): void {
    this.arrival$
      .pipe(
        takeUntil(this.destroy$),
        filter((arrivalTravelPoint: AutocompleteAddressFragment) => !!arrivalTravelPoint)
      )
      .subscribe((arrivalTravelPoint: AutocompleteAddressFragment) => this.dialogRef.close({ arrivalTravelPoint }));
  }

  private closeDialogWithDepartureAndArrival(): void {
    zip(this.departure$, this.arrival$)
      .pipe(
        takeUntil(this.destroy$),
        filter((travelPoints: NearestTravelPointFragment[]) => !travelPoints.some((travelPoint: NearestTravelPointFragment) => !travelPoint))
      )
      .subscribe((travelPoints: NearestTravelPointFragment[]) => this.closeMapSearchDialog(travelPoints));
  }

  private closeMapSearchDialog(travelPoints: NearestTravelPointFragment[]): void {
    const result: TravelPointSearchResult = this.buildDialogResultWith(travelPoints);
    this.dialogRef.close(result);
  }

  private buildDialogResultWith(travelPoints: NearestTravelPointFragment[]): TravelPointSearchResult {
    return {
      departureTravelPoint: travelPoints[0],
      arrivalTravelPoint: travelPoints[1]
    };
  }
}

