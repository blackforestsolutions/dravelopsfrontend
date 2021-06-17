import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiToken, Point, TravelTime } from '../../shared/model/api-token';
import { CustomErrorStateMatcher } from '../validators/custom-error-state-matcher';
import { Observable, Subject } from 'rxjs';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '@dravelopsfrontend/generated-content';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAX_FUTURE_DAYS_IN_CALENDAR, MAX_PAST_DAYS_IN_CALENDAR } from '../../../environments/config-tokens';
import { TravelPointApiService } from '../../shared/api/travel-point-api.service';
import { TravelPointValidators } from '../validators/travel-point-validators';
import { DateTimeValidators } from '../validators/date-time-validators';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

type TravelTimeFormValue = {
  date: Date,
  time: Date,
  isArrivalDateTime: boolean
};

@Component({
  selector: 'dravelopsefafrontend-journey-search-form',
  templateUrl: './journey-search-form.component.html',
  styleUrls: ['./journey-search-form.component.scss']
})
export class JourneySearchFormComponent implements OnChanges, OnInit, OnDestroy {

  @Input() departureTravelPoint: NearestTravelPointFragment;
  @Input() arrivalTravelPoint: NearestTravelPointFragment;
  @Output() readonly submitApiTokenEvent = new EventEmitter<ApiToken>();

  readonly customErrorStateMatcher = new CustomErrorStateMatcher();
  readonly departureInput$ = new Subject<string>();
  readonly arrivalInput$ = new Subject<string>();
  departureTravelPoints$: Observable<AutocompleteAddressFragment[]>;
  arrivalTravelPoints$: Observable<AutocompleteAddressFragment[]>;
  apiTokenForm: FormGroup;

  private readonly destroy$ = new Subject();

  constructor(
    @Inject(MAX_FUTURE_DAYS_IN_CALENDAR) private readonly maxFutureDaysInCalendar: number,
    @Inject(MAX_PAST_DAYS_IN_CALENDAR) private readonly maxPastDaysInCalendar: number,
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly fb: FormBuilder,
    private readonly travelPointApiService: TravelPointApiService
  ) {
  }

  ngOnChanges(): void {
    if (this.departureTravelPoint) {
      this.apiTokenForm.get('departureTravelPoint').setValue(this.departureTravelPoint);
    }
    if (this.arrivalTravelPoint) {
      this.apiTokenForm.get('arrivalTravelPoint').setValue(this.arrivalTravelPoint);
    }
  }

  ngOnInit(): void {
    this.initDepartureTravelPoints();
    this.initArrivalTravelPoints();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private initDepartureTravelPoints(): void {
    this.departureTravelPoints$ = this.departureInput$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => this.travelPointApiService.getAddressesBy(searchTerm))
      );
    // working with mock data
    // this.departureTravelPoints$ = of([{...getFurtwangenUniversityTravelPoint()}, {...getFurtwangenUniversityTravelPoint()}]);
  }

  private initArrivalTravelPoints(): void {
    this.arrivalTravelPoints$ = this.arrivalInput$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => this.travelPointApiService.getAddressesBy(searchTerm))
      );
    // working with mock data
    // this.arrivalTravelPoints$ = of([{...getFurtwangenUniversityTravelPoint()}, {...getFurtwangenUniversityTravelPoint()}]);
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

  private initForm(): void {
    if (this.apiTokenForm) {
      return;
    }

    this.apiTokenForm = this.fb.group({
      isRoundTrip: [false],
      departureTravelPoint: [null, [Validators.required, TravelPointValidators.pointFormat]],
      arrivalTravelPoint: [null, [Validators.required, TravelPointValidators.pointFormat]],
      outwardJourney: this.fb.group({
        date: [new Date(), Validators.required],
        time: [new Date(), Validators.required],
        isArrivalDateTime: [false]
      }),
      backwardJourney: this.fb.group({
        date: [null,
          [
            DateTimeValidators.requiredIf(() => this.apiTokenForm.get('isRoundTrip').value),
            DateTimeValidators.backwardDate(
              () => this.apiTokenForm.get('isRoundTrip').value,
              () => this.apiTokenForm.get('outwardJourney').get('date').value
            )
          ]
        ],
        time: [null,
          [
            DateTimeValidators.requiredIf(() => this.apiTokenForm.get('isRoundTrip').value),
            DateTimeValidators.backwardTime(
              () => this.apiTokenForm.get('isRoundTrip').value,
              () => this.apiTokenForm.get('backwardJourney').get('date').value,
              () => this.apiTokenForm.get('outwardJourney').get('date').value,
              () => this.apiTokenForm.get('outwardJourney').get('time').value
            )
          ]
        ],
        isArrivalDateTime: [false]
      })
    });
  }

  get isRoundTrip(): boolean {
    if (this.apiTokenForm) {
      return this.apiTokenForm.get('isRoundTrip').value;
    }
    return false;
  }

  submitForm(): void {
    this.apiTokenForm.get('backwardJourney').get('date').updateValueAndValidity();
    this.apiTokenForm.get('backwardJourney').get('time').updateValueAndValidity();
    if (this.apiTokenForm.invalid) {
      return;
    }

    const newApiToken: ApiToken = this.convertFormToApiToken();
    this.submitApiTokenEvent.emit(newApiToken);
  }

  private convertFormToApiToken(): ApiToken {
    const formValue = this.apiTokenForm.value;
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
