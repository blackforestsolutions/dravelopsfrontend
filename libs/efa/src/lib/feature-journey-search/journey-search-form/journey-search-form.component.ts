import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiToken } from '../../domain/model/api-token';
import { CustomErrorStateMatcher } from '../validators/custom-error-state-matcher';
import { Observable, Subject } from 'rxjs';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../domain/model/generated';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RADIUS_IN_KILOMETERS } from '@dravelopsfrontend/shared';
import { TravelPointApiService } from '../../domain/api/travel-point-api.service';
import { TravelPointValidators } from '../validators/travel-point-validators';
import { DateTimeValidators } from '../validators/date-time-validators';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LocationType, TravelPointSearchType } from '../travel-point-search/travel-point-search.component';
import { JourneySearchFormService } from '../services/journey-search-form.service';

@Component({
  selector: 'dravelopsefafrontend-journey-search-form',
  templateUrl: './journey-search-form.component.html',
  styleUrls: ['./journey-search-form.component.scss'],
  providers: [JourneySearchFormService]
})
export class JourneySearchFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input() travelPointSearchType: TravelPointSearchType = 'autocomplete';
  @Input() departureTravelPoint: NearestTravelPointFragment;
  @Input() arrivalTravelPoint: NearestTravelPointFragment;
  @Output() readonly submitApiTokenEvent = new EventEmitter<ApiToken>();
  @Output() readonly openTravelPointSearchEvent = new EventEmitter<LocationType>();

  readonly customErrorStateMatcher = new CustomErrorStateMatcher();
  departureTravelPoints$: Observable<AutocompleteAddressFragment[]>;
  arrivalTravelPoints$: Observable<AutocompleteAddressFragment[]>;
  apiTokenForm: FormGroup;

  private readonly destroy$ = new Subject();

  constructor(
    @Inject(RADIUS_IN_KILOMETERS) private readonly radiusInKilometers: number,
    public readonly journeySearchFormService: JourneySearchFormService,
    private readonly travelPointApiService: TravelPointApiService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
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
    this.departureTravelPoints$ = this.journeySearchFormService.searchDepartureTravelPoints();
    // working with mock data
    // this.departureTravelPoints$ = of([{...getFurtwangenUniversityTravelPoint()}, {...getFurtwangenUniversityTravelPoint()}]);
    this.arrivalTravelPoints$ = this.journeySearchFormService.searchArrivalTravelPoints();
    // working with mock data
    // this.arrivalTravelPoints$ = of([{...getFurtwangenUniversityTravelPoint()}, {...getFurtwangenUniversityTravelPoint()}]);
    this.initForm();
    this.initFormOnPageReload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  openTravelPointSearch(locationType: LocationType): void {
    this.openTravelPointSearchEvent.emit(locationType);
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

  private initFormOnPageReload(): void {
    if (this.route.firstChild) {
      this.initIsRoundTripOnPageReload();
      this.initOutwardJourneyOnPageReload();
      this.initBackwardJourneyOnPageReload();
      this.initDepartureOnPageReload();
      this.initArrivalOnPageReload();
    }
  }

  private initIsRoundTripOnPageReload(): void {
    const urlIsRoundTrip: string = this.route.firstChild.snapshot.paramMap.get('isRoundTrip');

    if (urlIsRoundTrip) {
      this.apiTokenForm.get('isRoundTrip').setValue(JSON.parse(urlIsRoundTrip));
      this.apiTokenForm.get('outwardJourneyDateTime');
    }
  }

  private initOutwardJourneyOnPageReload(): void {
    const urlOutwardJourneyDateTime: string = this.route.firstChild.snapshot.paramMap.get('outwardJourneyDateTime');
    const urlOutwardJourneyIsArrivalDateTime: string = this.route.firstChild.snapshot.paramMap.get('outwardJourneyIsArrivalDateTime');

    if (urlOutwardJourneyDateTime && urlOutwardJourneyIsArrivalDateTime) {
      this.apiTokenForm.get('outwardJourney').get('date').setValue(new Date(+urlOutwardJourneyDateTime));
      this.apiTokenForm.get('outwardJourney').get('time').setValue(new Date(+urlOutwardJourneyDateTime));
      this.apiTokenForm.get('outwardJourney').get('isArrivalDateTime').setValue(JSON.parse(urlOutwardJourneyIsArrivalDateTime));
    }
  }

  private initBackwardJourneyOnPageReload(): void {
    const urlBackwardJourneyDateTime: string = this.route.firstChild.snapshot.paramMap.get('backwardJourneyDateTime');
    const urlBackwardJourneyIsArrivalDateTime: string = this.route.firstChild.snapshot.paramMap.get('backwardJourneyIsArrivalDateTime');

    if (urlBackwardJourneyDateTime && urlBackwardJourneyIsArrivalDateTime) {
      this.apiTokenForm.get('backwardJourney').get('date').setValue(new Date(+urlBackwardJourneyDateTime));
      this.apiTokenForm.get('backwardJourney').get('time').setValue(new Date(+urlBackwardJourneyDateTime));
      this.apiTokenForm.get('backwardJourney').get('isArrivalDateTime').setValue(JSON.parse(urlBackwardJourneyIsArrivalDateTime));
    }
  }

  private initDepartureOnPageReload(): void {
    const urlDepartureLatitude: string = this.route.firstChild.snapshot.paramMap.get('departureLatitude');
    const urlDepartureLongitude: string = this.route.firstChild.snapshot.paramMap.get('departureLongitude');

    if (urlDepartureLatitude && urlDepartureLongitude) {
      this.travelPointApiService.getNearestAddressesBy(
        +urlDepartureLongitude,
        +urlDepartureLatitude,
        this.radiusInKilometers
      ).pipe(
        takeUntil(this.destroy$)
      ).subscribe((nearestAddresses: NearestTravelPointFragment[]) => this.apiTokenForm.get('departureTravelPoint').setValue(nearestAddresses[0]));
    }
  }

  private initArrivalOnPageReload(): void {
    const urlArrivalLatitude: string = this.route.firstChild.snapshot.paramMap.get('arrivalLatitude');
    const urlArrivalLongitude: string = this.route.firstChild.snapshot.paramMap.get('arrivalLongitude');

    if (urlArrivalLatitude && urlArrivalLongitude) {
      this.travelPointApiService.getNearestAddressesBy(
        +urlArrivalLongitude,
        +urlArrivalLatitude,
        this.radiusInKilometers
      ).pipe(
        takeUntil(this.destroy$)
      ).subscribe((nearestAddresses: NearestTravelPointFragment[]) => this.apiTokenForm.get('arrivalTravelPoint').setValue(nearestAddresses[0]));
    }
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

    const newApiToken: ApiToken = this.journeySearchFormService.convertFormToApiToken(this.apiTokenForm);
    this.submitApiTokenEvent.emit(newApiToken);
  }
}
