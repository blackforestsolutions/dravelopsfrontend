import { JourneySearchFormService } from './journey-search-form.service';
import { TravelPointApiService } from '../../domain/api/travel-point-api.service';
import { AutocompleteAddressFragment } from '../../domain/model/generated';
import {
  getAutocompleteTravelPoints,
  getFurtwangenUniversityTravelPoint
} from '../../domain/objectmothers/travel-point-object-mother';
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { DEBOUNCE_TIME } from '@dravelopsfrontend/shared';
import { TravelPointSearchType } from '../travel-point-search/travel-point-search.component';
import { FormGroup } from '@angular/forms';
import {
  getApiTokenFormWithIsRoundTripAsFalse, getApiTokenFormWithIsRoundTripAsTrue,
  getApiTokenWithIsRoundTripAsFalse, getApiTokenWithIsRoundTripAsTrue
} from '../../domain/objectmothers/api-token-object-mother';
import { ApiToken } from '../../domain/model/api-token';
import { expect } from '@jest/globals';

const TEST_SEARCH_TERM = 'H';

describe('JourneySearchFormService', () => {
  let travelPointApiService: TravelPointApiService;
  const maxPastDaysInCalendar = 5;
  const maxFutureDaysInCalendar = 5;

  let serviceUnderTest: JourneySearchFormService;

  beforeEach(() => {
    travelPointApiService = {
      getAddressesBy: jest.fn().mockReturnValue(of(getAutocompleteTravelPoints()))
    } as unknown as TravelPointApiService;

    serviceUnderTest = new JourneySearchFormService(
      maxPastDaysInCalendar,
      maxFutureDaysInCalendar,
      travelPointApiService
    );
  });

  it('should be created', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  it('should return name of travelPoint when "displayTravelPointName" is called with object and name', () => {
    const testTravelPoint: AutocompleteAddressFragment = getFurtwangenUniversityTravelPoint();

    const result: string = serviceUnderTest.displayTravelPointName(testTravelPoint);

    expect(result).toEqual(testTravelPoint.name);
  });

  it('should return empty string when name of travelPoint is null and "displayTravelPointName" is called', () => {
    const testTravelPoint: AutocompleteAddressFragment = {
      ...getFurtwangenUniversityTravelPoint(),
      name: null
    };

    const result: string = serviceUnderTest.displayTravelPointName(testTravelPoint);

    expect(result).toEqual('');
  });

  it('should return empty string when travelPoint is null and "displayTravelPointName" is called', () => {
    const testTravelPoint: AutocompleteAddressFragment = null;

    const result: string = serviceUnderTest.displayTravelPointName(testTravelPoint);

    expect(result).toEqual('');
  });

  it('should return travelPoints when new search term is triggered and "searchDepartureTravelPoints" is called', fakeAsync(() => {
    let expectedTravelPoints: AutocompleteAddressFragment[];
    serviceUnderTest.searchDepartureTravelPoints().subscribe((travelPoints: AutocompleteAddressFragment[]) => {
      expectedTravelPoints = travelPoints;
    });

    serviceUnderTest.departureInput$.next(TEST_SEARCH_TERM);
    tick(DEBOUNCE_TIME);

    expect(expectedTravelPoints).toEqual(getAutocompleteTravelPoints());
  }));

  it('should be called travelPointApiService once when new search term is triggered and "searchDepartureTravelPoints" is called', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy');
    serviceUnderTest.searchDepartureTravelPoints().subscribe();

    serviceUnderTest.departureInput$.next(TEST_SEARCH_TERM);
    tick(DEBOUNCE_TIME);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(1);
    expect(travelPointApiServiceSpy).toHaveBeenCalledWith(TEST_SEARCH_TERM);
  }));

  it('should not be called travelPointApiService when search term is empty and "searchDepartureTravelPoints" is called', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy');
    serviceUnderTest.searchDepartureTravelPoints().subscribe();

    serviceUnderTest.departureInput$.next('');
    tick(DEBOUNCE_TIME);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(0);
  }));

  it('should be called travelPointApiService only one when search term is two times equal and "searchDepartureTravelPoints" is called', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy');
    serviceUnderTest.searchDepartureTravelPoints().subscribe();

    serviceUnderTest.departureInput$.next(TEST_SEARCH_TERM);
    serviceUnderTest.departureInput$.next(TEST_SEARCH_TERM);
    tick(DEBOUNCE_TIME * 3);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(1);
  }));

  it('should return travelPoints when new search term is triggered and "searchArrivalTravelPoints" is called', fakeAsync(() => {
    let expectedTravelPoints: AutocompleteAddressFragment[];
    serviceUnderTest.searchArrivalTravelPoints().subscribe((travelPoints: AutocompleteAddressFragment[]) => {
      expectedTravelPoints = travelPoints;
    });

    serviceUnderTest.arrivalInput$.next(TEST_SEARCH_TERM);
    tick(DEBOUNCE_TIME);

    expect(expectedTravelPoints).toEqual(getAutocompleteTravelPoints());
  }));

  it('should be called travelPointApiService once when new search term is triggered and "searchArrivalTravelPoints" is called', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy');
    serviceUnderTest.searchArrivalTravelPoints().subscribe();

    serviceUnderTest.arrivalInput$.next(TEST_SEARCH_TERM);
    tick(DEBOUNCE_TIME);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(1);
    expect(travelPointApiServiceSpy).toHaveBeenCalledWith(TEST_SEARCH_TERM);
  }));

  it('should not be called travelPointApiService when search term is empty and "searchArrivalTravelPoints" is called', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy');
    serviceUnderTest.searchArrivalTravelPoints().subscribe();

    serviceUnderTest.arrivalInput$.next('');
    tick(DEBOUNCE_TIME);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(0);
  }));

  it('should be called travelPointApiService only one when search term is two times equal and "searchArrivalTravelPoints" is called', fakeAsync(() => {
    const travelPointApiServiceSpy = jest.spyOn(travelPointApiService, 'getAddressesBy');
    serviceUnderTest.searchArrivalTravelPoints().subscribe();

    serviceUnderTest.arrivalInput$.next(TEST_SEARCH_TERM);
    serviceUnderTest.arrivalInput$.next(TEST_SEARCH_TERM);
    tick(DEBOUNCE_TIME * 3);

    expect(travelPointApiServiceSpy).toHaveBeenCalledTimes(1);
  }));

  it('should return map icon when "travelPointSearchType" is "map"', () => {
    const testTravelPointSearchType: TravelPointSearchType = 'map';

    const result: string = serviceUnderTest.getTravelPointSearchIcon(testTravelPointSearchType);

    expect(result).toBe('map');
  });

  it('should return location icon when "travelPointSearchType" is "autocomplete"', () => {
    const testTravelPointSearchType: TravelPointSearchType = 'autocomplete';

    const result: string = serviceUnderTest.getTravelPointSearchIcon(testTravelPointSearchType);

    expect(result).toBe('location_on');
  });

  it('should convert apiTokenForm to apiToken correctly when isRoundTrip = false', () => {
    const testApiTokenForm: FormGroup = { value: getApiTokenFormWithIsRoundTripAsFalse() } as FormGroup;

    const result: ApiToken = serviceUnderTest.convertFormToApiToken(testApiTokenForm);

    expect(result).toEqual(getApiTokenWithIsRoundTripAsFalse());
  });

  it('should convert apiTokenForm to apiToken correctly when isRoundTrip = true', () => {
    const testApiTokenForm: FormGroup = { value: getApiTokenFormWithIsRoundTripAsTrue() } as FormGroup;

    const result: ApiToken = serviceUnderTest.convertFormToApiToken(testApiTokenForm);

    expect(result).toEqual(getApiTokenWithIsRoundTripAsTrue());
  });
});
