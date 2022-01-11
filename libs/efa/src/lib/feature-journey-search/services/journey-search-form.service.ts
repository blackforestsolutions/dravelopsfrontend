import { Inject, Injectable } from '@angular/core';
import {
  DEBOUNCE_TIME,
  MAX_FUTURE_DAYS_IN_CALENDAR,
  MAX_PAST_DAYS_IN_CALENDAR,
  MIN_SEARCH_TERM_LENGTH
} from '@dravelopsfrontend/shared';
import { AutocompleteAddressFragment } from '../../domain/model/generated';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { TravelPointApiService } from '../../domain/api/travel-point-api.service';
import { TravelPointSearchType } from '../travel-point-search/travel-point-search.component';
import { ApiToken, Point, TravelTime } from '../../domain/model/api-token';
import { FormGroup } from '@angular/forms';

type TravelTimeFormValue = {
  date: Date,
  time: Date,
  isArrivalDateTime: boolean
};

@Injectable()
export class JourneySearchFormService {
  readonly departureInput$: Subject<string> = new Subject<string>();
  readonly arrivalInput$: Subject<string> = new Subject<string>();

  constructor(
    @Inject(MAX_PAST_DAYS_IN_CALENDAR) private readonly maxPastDaysInCalendar: number,
    @Inject(MAX_FUTURE_DAYS_IN_CALENDAR) private readonly maxFutureDaysInCalendar: number,
    private readonly travelPointApiService: TravelPointApiService
  ) {
  }

  initMinDate(): Date {
    const today = new Date();
    today.setDate(today.getDate() - this.maxPastDaysInCalendar);
    return today;
  }

  initMaxDate(): Date {
    const today = new Date();
    today.setDate(today.getDate() + this.maxFutureDaysInCalendar);
    return today;
  }

  displayTravelPointName(travelPoint: AutocompleteAddressFragment): string {
    if (travelPoint && travelPoint.name) {
      return travelPoint.name;
    }
    return '';
  }

  searchDepartureTravelPoints(): Observable<AutocompleteAddressFragment[]> {
    return this.departureInput$
      .pipe(
        filter((searchTerm: string) => searchTerm.length >= MIN_SEARCH_TERM_LENGTH),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => this.travelPointApiService.getAddressesBy(searchTerm))
      );
  }

  searchArrivalTravelPoints(): Observable<AutocompleteAddressFragment[]> {
    return this.arrivalInput$
      .pipe(
        filter((searchTerm: string) => searchTerm.length >= MIN_SEARCH_TERM_LENGTH),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => this.travelPointApiService.getAddressesBy(searchTerm))
      );
  }

  getTravelPointSearchIcon(travelPointSearchType: TravelPointSearchType): string {
    if (travelPointSearchType === 'map') {
      return 'map';
    }
    return 'location_on';
  }

  convertFormToApiToken(apiTokenForm: FormGroup): ApiToken {
    const formValue = apiTokenForm.value;
    const isRoundTrip: boolean = formValue.isRoundTrip;
    const departureLatitude: number = formValue.departureTravelPoint.point.y;
    const departureLongitude: number = formValue.departureTravelPoint.point.x;
    const departureCoordinate: Point = this.buildPointWith(departureLongitude, departureLatitude);
    const arrivalLatitude: number = formValue.arrivalTravelPoint.point.y;
    const arrivalLongitude: number = formValue.arrivalTravelPoint.point.x;
    const arrivalCoordinate: Point = this.buildPointWith(arrivalLongitude, arrivalLatitude);
    const outwardJourney: TravelTime = this.extractTravelTimeFrom(formValue.outwardJourney);

    if (isRoundTrip) {
      const backwardJourney: TravelTime = this.extractTravelTimeFrom(formValue.backwardJourney);
      return {
        isRoundTrip,
        departureCoordinate,
        arrivalCoordinate,
        outwardJourney,
        backwardJourney
      };
    }
    return {
      isRoundTrip,
      departureCoordinate,
      arrivalCoordinate,
      outwardJourney
    };
  }

  private extractTravelTimeFrom(travelTimeFormValue: TravelTimeFormValue): TravelTime {
    const dateTime: Date = this.mergeToDateTime(travelTimeFormValue.date, travelTimeFormValue.time);
    const isArrivalDateTime: boolean = travelTimeFormValue.isArrivalDateTime;

    return {
      dateTime,
      isArrivalDateTime
    };
  }

  private mergeToDateTime(date: Date, time: Date): Date {
    const dateTime: Date = new Date(date);
    dateTime.setHours(time.getHours());
    dateTime.setMinutes(time.getMinutes());
    dateTime.setSeconds(time.getSeconds());
    return dateTime;
  }

  private buildPointWith(longitude: number, latitude: number): Point {
    return {
      longitude,
      latitude
    };
  }
}
