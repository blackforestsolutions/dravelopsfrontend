import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneySearchFormComponent } from './journey-search-form.component';
import { TravelPointApiService } from '../../domain/api/travel-point-api.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockProvider } from 'ng-mocks';
import {
  MAX_FUTURE_DAYS_IN_CALENDAR,
  MAX_PAST_DAYS_IN_CALENDAR,
  RADIUS_IN_KILOMETERS
} from '@dravelopsfrontend/shared';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenUniversityTravelPoint
} from '../../domain/objectmothers/travel-point-object-mother';
import {
  getApiTokenFormWithIsRoundTripAsFalse,
  getApiTokenFormWithIsRoundTripAsTrue,
  getApiTokenWithIsRoundTripAsFalse,
  getApiTokenWithIsRoundTripAsTrue
} from '../../domain/objectmothers/api-token-object-mother';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatRadioButtonHarness, MatRadioGroupHarness } from '@angular/material/radio/testing';
import { ApiToken } from '../../domain/model/api-token';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { JourneySearchFormService } from '../services/journey-search-form.service';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
import { LocationType } from '../travel-point-search/travel-point-search.component';

const MAX_FUTURE_DAYS_IN_CALENDAR_TEST_VALUE = 365;
const MAX_PAST_DAYS_IN_CALENDAR_TEST_VALUE = 7305;

describe('JourneySearchFormComponent', () => {
  let componentUnderTest: JourneySearchFormComponent;
  let travelPointApiService: TravelPointApiService;
  let journeySearchFormService: JourneySearchFormService;
  let fixture: ComponentFixture<JourneySearchFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JourneySearchFormComponent],
      imports: [
        MatRadioModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTimepickerModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        MockProvider(TravelPointApiService),
        JourneySearchFormService,
        {
          provide: MAX_FUTURE_DAYS_IN_CALENDAR,
          useValue: MAX_FUTURE_DAYS_IN_CALENDAR_TEST_VALUE
        },
        {
          provide: MAX_PAST_DAYS_IN_CALENDAR,
          useValue: MAX_PAST_DAYS_IN_CALENDAR_TEST_VALUE
        },
        {
          provide: RADIUS_IN_KILOMETERS,
          useValue: 5
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneySearchFormComponent);
    journeySearchFormService = TestBed.inject(JourneySearchFormService);
    travelPointApiService = TestBed.inject(TravelPointApiService);
    componentUnderTest = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should instantiate "apiTokenForm" correctly', () => {
    expect(componentUnderTest.apiTokenForm.value).toMatchObject({
      isRoundTrip: false,
      departureTravelPoint: null,
      arrivalTravelPoint: null,
      outwardJourney: {
        isArrivalDateTime: false
      },
      backwardJourney: {
        date: null,
        time: null,
        isArrivalDateTime: false
      }
    });
    expect(componentUnderTest.apiTokenForm.get('outwardJourney').get('date').value.toDateString()).toEqual(new Date().toDateString());
    expect(componentUnderTest.apiTokenForm.get('outwardJourney').get('time').value.toDateString()).toEqual(new Date().toDateString());
  });

  it('should not instantiate "apiTokenForm" when the form is already set', () => {
    componentUnderTest.apiTokenForm.setValue(getApiTokenFormWithIsRoundTripAsTrue());

    componentUnderTest.ngOnInit();

    expect(componentUnderTest.apiTokenForm.value).toEqual(getApiTokenFormWithIsRoundTripAsTrue());
  });

  it('should set departureTravelPoint form control on changes when available', () => {
    componentUnderTest.departureTravelPoint = getFurtwangenKindergardenTravelPoint();

    componentUnderTest.ngOnChanges();

    expect(componentUnderTest.apiTokenForm.get('departureTravelPoint').value).toEqual(getFurtwangenKindergardenTravelPoint());
  });

  it('should not set departureTravelPoint form control on changes when not available', () => {
    componentUnderTest.departureTravelPoint = undefined;

    componentUnderTest.ngOnChanges();

    expect(componentUnderTest.apiTokenForm.get('departureTravelPoint').value).toBeNull();
  });

  it('should set arrivalTravelPoint form control on changes when available', () => {
    componentUnderTest.arrivalTravelPoint = getFurtwangenKindergardenTravelPoint();

    componentUnderTest.ngOnChanges();

    expect(componentUnderTest.apiTokenForm.get('arrivalTravelPoint').value).toEqual(getFurtwangenKindergardenTravelPoint());
  });

  it('should not set arrivalTravelPoint form control on changes when not available', () => {
    componentUnderTest.arrivalTravelPoint = undefined;

    componentUnderTest.ngOnChanges();

    expect(componentUnderTest.apiTokenForm.get('arrivalTravelPoint').value).toBeNull();
  });

  it('should be called "openTravelPointSearch" when departure form field is clicked', () => {
    const openTravelPointSearchSpy = jest.spyOn(componentUnderTest, 'openTravelPointSearch');

    const departureFormField = fixture.nativeElement.querySelector('.start');
    departureFormField.click();

    expect(openTravelPointSearchSpy).toHaveBeenCalledTimes(1);
    expect(openTravelPointSearchSpy).toHaveBeenCalledWith('departure');
  });

  it('should be called "openTravelPointSearch" when arrival form field is clicked', () => {
    const openTravelPointSearchSpy = jest.spyOn(componentUnderTest, 'openTravelPointSearch');

    const departureFormField = fixture.nativeElement.querySelector('.destination');
    departureFormField.click();

    expect(openTravelPointSearchSpy).toHaveBeenCalledTimes(1);
    expect(openTravelPointSearchSpy).toHaveBeenCalledWith('arrival');
  });

  it('should emit "openTravelPointSearchEvent" when "openTravelPointSearch" is called', () => {
    const testLocationType: LocationType = 'departure';
    let expectedLocationType: LocationType;
    componentUnderTest.openTravelPointSearchEvent.subscribe((locationType: LocationType) => {
      expectedLocationType = locationType;
    });

    componentUnderTest.openTravelPointSearch(testLocationType);

    expect(expectedLocationType).toBe(testLocationType);
  });

  it('should be shown backwardJourneyFormGroup when "isRoundTrip" is true', async () => {
    componentUnderTest.apiTokenForm.setValue(getApiTokenFormWithIsRoundTripAsTrue());

    const backwardJourneyDate = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Datum (Rück.)' }));
    const backwardJourneyTime = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Uhrzeit (Rück.)' }));
    const backwardJourneyIsArrivalTime = await loader.getHarness(MatRadioGroupHarness.with(
      { selector: '#backwardJourneyIsArrivalDateTime' })
    );
    expect(backwardJourneyDate).not.toBeNull();
    expect(backwardJourneyTime).not.toBeNull();
    expect(backwardJourneyIsArrivalTime).not.toBeNull();
  });

  it('should return an apiToken with backwardJourney and trigger the "submitApiTokenEvent" when submitForm is called', () => {
    const expectedApiToken: ApiToken = getApiTokenWithIsRoundTripAsTrue();
    componentUnderTest.apiTokenForm.setValue(getApiTokenFormWithIsRoundTripAsTrue());
    let receivedApiToken: ApiToken;
    componentUnderTest.submitApiTokenEvent.subscribe(apiToken => receivedApiToken = apiToken);

    componentUnderTest.submitForm();

    expect(receivedApiToken).toEqual(expectedApiToken);
  });

  it('should return an apiToken without backwardJourney and trigger the "submitApiTokenEvent" when submitForm is called', () => {
    const expectedApiToken: ApiToken = getApiTokenWithIsRoundTripAsFalse();
    componentUnderTest.apiTokenForm.setValue(getApiTokenFormWithIsRoundTripAsFalse());
    let receivedApiToken: ApiToken;
    componentUnderTest.submitApiTokenEvent.subscribe(apiToken => receivedApiToken = apiToken);

    componentUnderTest.submitForm();

    expect(receivedApiToken).toEqual(expectedApiToken);
  });

  it('should be called "submitForm" when form is submitted', () => {
    const submitFormSpy = jest.spyOn(componentUnderTest, 'submitForm');
    const submitButton = fixture.nativeElement.querySelector('button');

    submitButton.click();

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('should not be called "submitApiTokenEvent" when form is invalid', () => {
    const submitApiTokenEventSpy = jest.spyOn(componentUnderTest.submitApiTokenEvent, 'emit');
    const submitButton = fixture.nativeElement.querySelector('button');

    submitButton.click();

    expect(submitApiTokenEventSpy).not.toHaveBeenCalled();
  });

  it('should be synchronized "isRoundTrip" when new value is selected', async () => {
    const radioButtonHarnesses = await loader.getHarness<MatRadioButtonHarness>(MatRadioButtonHarness.with({
      label: 'Hin- und Rückfahrt'
    }));

    await radioButtonHarnesses.check();

    expect(componentUnderTest.apiTokenForm.get('isRoundTrip').value).toBeTruthy();
  });

  it('should be synchronized departureTravelPoint when new value is selected', async () => {
    jest.spyOn(travelPointApiService, 'getAddressesBy').mockReturnValue(of([{ ...getFurtwangenUniversityTravelPoint() }]));
    const autocompleteHarnesses = await loader.getAllHarnesses<MatAutocompleteHarness>(MatAutocompleteHarness);
    await autocompleteHarnesses[0].enterText('B');

    await autocompleteHarnesses[0].selectOption({ text: 'Hochschule Furtwangen' });

    expect(componentUnderTest.apiTokenForm.get('departureTravelPoint').value).toEqual(getFurtwangenUniversityTravelPoint());
  });

  it('should be synchronized arrivalTravelPoint when new value is selected', async () => {
    jest.spyOn(travelPointApiService, 'getAddressesBy').mockReturnValue(of([{ ...getFurtwangenUniversityTravelPoint() }]));
    const autocompleteHarnesses = await loader.getAllHarnesses<MatAutocompleteHarness>(MatAutocompleteHarness);
    await autocompleteHarnesses[1].enterText('B');

    await autocompleteHarnesses[1].selectOption({ text: 'Hochschule Furtwangen' });

    expect(componentUnderTest.apiTokenForm.get('arrivalTravelPoint').value).toEqual(getFurtwangenUniversityTravelPoint());
  });

  it('should be synchronized "outwardJourneyDate" when new date is selected', async () => {
    const datePickerHarness = await loader.getHarness<MatDatepickerInputHarness>(MatDatepickerInputHarness.with({
      selector: '#outwardJourneyDate'
    }));

    await datePickerHarness.setValue('2021-04-24T00:00:00+02:00');

    expect(componentUnderTest.apiTokenForm.get('outwardJourney').get('date').value).toEqual(new Date('2021-04-24T00:00:00+02:00'));
  });

  it('should be synchronized "outwardJourneyIsArrivalDateTime" form control when new radio button is checked', async () => {
    const radioButton = await loader.getHarness<MatRadioButtonHarness>(MatRadioButtonHarness.with({
      label: 'An'
    }));

    await radioButton.check();

    expect(componentUnderTest.apiTokenForm.get('outwardJourney').get('isArrivalDateTime').value).toBeTruthy();
  });

  it('should be synchronized "backwardJourneyDate" when new date is selected', async () => {
    componentUnderTest.apiTokenForm.setValue(getApiTokenFormWithIsRoundTripAsTrue());
    const datePickerHarness = await loader.getHarness<MatDatepickerInputHarness>(MatDatepickerInputHarness.with({
      selector: '#backwardJourneyDate'
    }));

    await datePickerHarness.setValue('2021-04-24T00:00:00+02:00');

    expect(componentUnderTest.apiTokenForm.get('backwardJourney').get('date').value).toEqual(new Date('2021-04-24T00:00:00+02:00'));
  });

  it('should be synchronized "backwardJourneyIsArrivalDateTime" form control when new radio button is checked', async () => {
    componentUnderTest.apiTokenForm.setValue(getApiTokenFormWithIsRoundTripAsTrue());
    const radioButton = await loader.getHarness<MatRadioButtonHarness>(MatRadioButtonHarness.with({
      label: 'An'
    }));

    await radioButton.check();

    expect(componentUnderTest.apiTokenForm.get('backwardJourney').get('isArrivalDateTime').value).toBeTruthy();
  });

  it('should show an error message on all fields where a value is required', async () => {
    const apiTokenForm: FormGroup = componentUnderTest.apiTokenForm;
    apiTokenForm.get('isRoundTrip').setValue(true);
    apiTokenForm.get('outwardJourney').get('date').setValue(null);
    apiTokenForm.get('outwardJourney').get('time').setValue(null);

    const buttonHarness = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    await buttonHarness.click();

    const departureTravelPointFormField = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Start' }));
    const arrivalTravelPointFormField = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Ziel' }));
    const outwardJourneyDateFormField = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Datum (Hin.)' }));
    const outwardJourneyTimeFormField = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Uhrzeit (Hin.)' }));
    const backwardJourneyDateFormField = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Datum (Rück.)' }));
    const backwardJourneyTimeFormField = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Uhrzeit (Rück.)' }));
    expect((await departureTravelPointFormField.getTextErrors()).length).toBe(1);
    expect((await departureTravelPointFormField.getTextErrors())[0]).toBe('Bitte wähle einen Ort aus');
    expect((await arrivalTravelPointFormField.getTextErrors()).length).toBe(1);
    expect((await arrivalTravelPointFormField.getTextErrors())[0]).toBe('Bitte wähle einen Ort aus');
    expect((await outwardJourneyDateFormField.getTextErrors()).length).toBe(1);
    expect((await outwardJourneyDateFormField.getTextErrors())[0]).toBe('Bitte wähle ein Datum aus');
    expect((await outwardJourneyTimeFormField.getTextErrors()).length).toBe(1);
    expect((await outwardJourneyTimeFormField.getTextErrors())[0]).toBe('Bitte wähle eine Uhrzeit aus');
    expect((await backwardJourneyDateFormField.getTextErrors()).length).toBe(1);
    expect((await backwardJourneyDateFormField.getTextErrors())[0]).toBe('Bitte wähle ein Datum aus');
    expect((await backwardJourneyTimeFormField.getTextErrors()).length).toBe(1);
    expect((await backwardJourneyTimeFormField.getTextErrors())[0]).toBe('Bitte wähle eine Uhrzeit aus');
  });

  it('should show an error message when backwardJourneyDate is before outwardJourneyDate', async () => {
    const apiTokenForm: FormGroup = componentUnderTest.apiTokenForm;
    apiTokenForm.setValue(getApiTokenFormWithIsRoundTripAsTrue());
    apiTokenForm.get('backwardJourney').get('date').setValue(new Date('2020-09-29T00:00:00+02:00'));

    const buttonHarness = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    await buttonHarness.click();

    const backwardJourneyDateFormField = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Datum (Rück.)' }));
    expect((await backwardJourneyDateFormField.getTextErrors()).length).toBe(1);
    expect((await backwardJourneyDateFormField.getTextErrors())[0]).toBe('Rückfahrtdatum vor Hinfahrtdatum');
  });

  // because description is necessary for test understanding
  // eslint-disable-next-line max-len
  it('should show an error message when backwardJourneyDate is equal to outwardJourneyDate and backwardJourneyTime is equal to outwardJourneyTime', async () => {
    const apiTokenForm: FormGroup = componentUnderTest.apiTokenForm;
    apiTokenForm.setValue(getApiTokenFormWithIsRoundTripAsTrue());
    apiTokenForm.get('backwardJourney').get('date').setValue(new Date('2020-09-30T12:30:30+02:00'));
    apiTokenForm.get('backwardJourney').get('time').setValue(new Date('2020-09-30T13:00:00+02:00'));

    const buttonHarness = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    await buttonHarness.click();

    const backwardJourneyTimeFormField = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Uhrzeit (Rück.)' }));
    expect((await backwardJourneyTimeFormField.getTextErrors()).length).toBe(1);
    expect((await backwardJourneyTimeFormField.getTextErrors())[0]).toBe('Rückfahrtzeit vor Hinfahrtzeit');
  });
});
