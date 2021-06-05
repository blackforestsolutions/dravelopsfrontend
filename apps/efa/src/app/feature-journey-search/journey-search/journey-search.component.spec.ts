import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { JourneySearchComponent } from './journey-search.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatRadioButtonHarness, MatRadioGroupHarness } from '@angular/material/radio/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { TravelPointApiService } from '../../shared/api/travel-point-api.service';
import { SharedModule } from '../../shared/shared.module';
import { MAX_FUTURE_DAYS_IN_CALENDAR, MAX_PAST_DAYS_IN_CALENDAR } from '../../../environments/config-tokens';
import {
  getApiTokenFormWithIsRoundTripAsFalse,
  getApiTokenFormWithIsRoundTripAsTrue,
  getApiTokenWithIsRoundTripAsFalse,
  getApiTokenWithIsRoundTripAsTrue
} from '../../shared/objectmothers/api-token-object-mother';
import { ApiToken } from '../../shared/model/api-token';
import { AutocompleteTravelPointFragment } from '../../shared/model/generated';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { getFurtwangenUniversityTravelPoint } from '../../shared/objectmothers/travel-point-object-mother';
import { MockProvider } from 'ng-mocks';


const MAX_FUTURE_DAYS_IN_CALENDAR_TEST_VALUE = 365;
const MAX_PAST_DAYS_IN_CALENDAR_TEST_VALUE = 7305;

describe('JourneySearchComponent', () => {
  let componentUnderTest: JourneySearchComponent;
  let travelPointApiService: TravelPointApiService;
  let fixture: ComponentFixture<JourneySearchComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JourneySearchComponent],
      imports: [SharedModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        MockProvider(TravelPointApiService),
        {
          provide: MAX_FUTURE_DAYS_IN_CALENDAR,
          useValue: MAX_FUTURE_DAYS_IN_CALENDAR_TEST_VALUE
        },
        {
          provide: MAX_PAST_DAYS_IN_CALENDAR,
          useValue: MAX_PAST_DAYS_IN_CALENDAR_TEST_VALUE
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneySearchComponent);
    componentUnderTest = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();

    travelPointApiService = TestBed.inject(TravelPointApiService);
    spyOn(travelPointApiService, 'getAddressesBy').and.returnValue(of([{ ...getFurtwangenUniversityTravelPoint() }]));
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

  it('should return "departureTravelPoints$" when next search term for "departureInput$" is emitted', (done) => {
    const testSearchTerm = 'Berlin';

    componentUnderTest.departureTravelPoints$.subscribe(travelPoints => {
      expect(travelPoints.length).toBe(1);
      expect(travelPoints[0]).toEqual(getFurtwangenUniversityTravelPoint());
      done();
    });

    componentUnderTest.departureInput$.next(testSearchTerm);
  });

  it('should return "arrivalTravelPoints$" when next search term for "arrivalInput$" is emitted', (done) => {
    const testSearchTerm = 'Berlin';

    componentUnderTest.arrivalTravelPoints$.subscribe(travelPoints => {
      expect(travelPoints.length).toBe(1);
      expect(travelPoints[0]).toEqual(getFurtwangenUniversityTravelPoint());
      done();
    });

    componentUnderTest.arrivalInput$.next(testSearchTerm);
  });

  it('should execute "travelPointApiService" correctly when next search term for "departureInput$" is emitted', fakeAsync(() => {
    const testSearchTerm = 'Berlin';

    componentUnderTest.departureInput$.next(testSearchTerm);
    tick();

    expect(travelPointApiService.getAddressesBy).toHaveBeenCalledTimes(1);
    expect(travelPointApiService.getAddressesBy).toHaveBeenCalledWith(expect.stringContaining(testSearchTerm));
  }));

  it('should execute "travelPointApiService" correctly when next search term for "arrivalInput$" is emitted', fakeAsync(() => {
    const testSearchTerm = 'Berlin';

    componentUnderTest.arrivalInput$.next(testSearchTerm);
    tick();

    expect(travelPointApiService.getAddressesBy).toHaveBeenCalledTimes(1);
    expect(travelPointApiService.getAddressesBy).toHaveBeenCalledWith(expect.stringContaining(testSearchTerm));
  }));

  it('"initMinDate" should return current date', () => {
    const expectedDate: Date = new Date();
    expectedDate.setDate(expectedDate.getDate() - MAX_PAST_DAYS_IN_CALENDAR_TEST_VALUE);

    const result: Date = componentUnderTest.initMinDate();

    expect(result.toDateString()).toEqual(expectedDate.toDateString());
  });

  it('"initMaxDate" should return current date plus one year', () => {
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + MAX_FUTURE_DAYS_IN_CALENDAR_TEST_VALUE);

    const result: Date = componentUnderTest.initMaxDate();

    expect(result.getFullYear()).toEqual(expectedDate.getFullYear());
    expect(result.getDate()).toEqual(expectedDate.getDate());
    expect(result.getMonth()).toEqual(expectedDate.getMonth());
  });

  it('should return name of travelPoint object', () => {

    const result: string = componentUnderTest.displayTravelPointName(getFurtwangenUniversityTravelPoint());

    expect(result).toEqual(getFurtwangenUniversityTravelPoint().name);
  });

  it('should return empty string when travelPointName is null', () => {
    const testTravelPoint: AutocompleteTravelPointFragment = {
      ...getFurtwangenUniversityTravelPoint(),
      name: null
    };

    const result: string = componentUnderTest.displayTravelPointName(testTravelPoint);

    expect(result).toEqual('');
  });

  it('should return empty string when travelPoint is null', () => {
    const testTravelPoint: AutocompleteTravelPointFragment = null;

    const result: string = componentUnderTest.displayTravelPointName(testTravelPoint);

    expect(result).toEqual('');
  });

  it('should should be called "displayTravelPointName" when new option is selected in departureInput', async () => {
    const displayTravelPointNameSpy = spyOn(componentUnderTest, 'displayTravelPointName');
    const inputElement = fixture.nativeElement.querySelector('#departureInput');
    inputElement.value = 'Am';
    inputElement.dispatchEvent(new KeyboardEvent(
      'keyup', { bubbles: true, cancelable: true, shiftKey: false }
    ));

    const matAutocomplete = await loader.getHarness<MatAutocompleteHarness>(MatAutocompleteHarness);
    await matAutocomplete.selectOption({
      text: 'Hochschule Furtwangen'
    });

    expect(displayTravelPointNameSpy).toHaveBeenCalledTimes(1);
    expect(displayTravelPointNameSpy).toHaveBeenCalledWith(getFurtwangenUniversityTravelPoint());
  });

  it('should should be called "displayTravelPointName" when new option is selected in arrivalInput', async () => {
    const displayTravelPointNameSpy = spyOn(componentUnderTest, 'displayTravelPointName');
    const inputElement = fixture.nativeElement.querySelector('#arrivalInput');
    inputElement.dispatchEvent(new KeyboardEvent(
      'keyup', { bubbles: true, cancelable: true, shiftKey: false }
    ));

    const matAutocomplete = await loader.getAllHarnesses<MatAutocompleteHarness>(MatAutocompleteHarness)
      .then(autocompletes => autocompletes[1]);
    await matAutocomplete.selectOption({
      text: 'Hochschule Furtwangen'
    });

    expect(displayTravelPointNameSpy).toHaveBeenCalledTimes(1);
    expect(displayTravelPointNameSpy).toHaveBeenCalledWith(getFurtwangenUniversityTravelPoint());
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
    const submitFormSpy = spyOn(componentUnderTest, 'submitForm');
    const submitButton = fixture.nativeElement.querySelector('button');

    submitButton.click();

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('should not be called "submitApiTokenEvent" when form is invalid', () => {
    const submitApiTokenEventSpy = spyOn(componentUnderTest.submitApiTokenEvent, 'emit');
    const submitButton = fixture.nativeElement.querySelector('button');

    submitButton.click();

    expect(submitApiTokenEventSpy).not.toHaveBeenCalled();
  });

  it('should be passed a new value to "departureInput$" when new departureInput is triggered', () => {
    const departureInputSpy = spyOn(componentUnderTest.departureInput$, 'next');

    const inputElement = fixture.nativeElement.querySelector('#departureInput');
    inputElement.value = 'H';
    inputElement.dispatchEvent(new KeyboardEvent(
      'keyup', { bubbles: true, cancelable: true, shiftKey: false }
    ));

    expect(departureInputSpy).toHaveBeenCalledTimes(1);
    expect(departureInputSpy).toHaveBeenCalledWith('H');
  });

  it('should be passed a new value to "arrivalInput$" when new arrivalInput is triggered', () => {
    const arrivalInputSpy = spyOn(componentUnderTest.arrivalInput$, 'next');

    const inputElement = fixture.nativeElement.querySelector('#arrivalInput');
    inputElement.value = 'H';
    inputElement.dispatchEvent(new KeyboardEvent(
      'keyup', { bubbles: true, cancelable: true, shiftKey: false }
    ));

    expect(arrivalInputSpy).toHaveBeenCalledTimes(1);
    expect(arrivalInputSpy).toHaveBeenCalledWith('H');
  });

  it('should be synchronized "isRoundTrip" when new value is selected', async () => {
    const radioButtonHarnesses = await loader.getHarness<MatRadioButtonHarness>(MatRadioButtonHarness.with({
      label: 'Hin- und Rückfahrt'
    }));

    await radioButtonHarnesses.check();

    expect(componentUnderTest.apiTokenForm.get('isRoundTrip').value).toBeTruthy();
  });

  it('should be synchronized departureTravelPoint when new value is selected', async () => {
    const autocompleteHarnesses = await loader.getAllHarnesses<MatAutocompleteHarness>(MatAutocompleteHarness);
    await autocompleteHarnesses[0].enterText('B');

    await autocompleteHarnesses[0].selectOption({ text: 'Hochschule Furtwangen' });

    expect(componentUnderTest.apiTokenForm.get('departureTravelPoint').value).toEqual(getFurtwangenUniversityTravelPoint());
  });

  it('should be synchronized arrivalTravelPoint when new value is selected', async () => {
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
    expect((await backwardJourneyDateFormField.getTextErrors())[0]).toBe('Das Rückfahrtdatum muss nach dem Hinfahrtdatum liegen');
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
    expect((await backwardJourneyTimeFormField.getTextErrors())[0]).toBe('Die Rückfahrtzeit muss nach der Hinfahrtzeit liegen');
  });
});
