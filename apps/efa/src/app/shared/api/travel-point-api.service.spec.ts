import { TestBed } from '@angular/core/testing';

import { TravelPointApiService } from './travel-point-api.service';
import {
  AutocompleteAddressFragment,
  GetAddressesGQL,
  GetNearestAddressesGQL,
  GetNearestStationsGQL,
  NearestTravelPointFragment
} from '@dravelopsfrontend/generated-content';
import {
  getFurtwangenFriedrichStreetOneTravelPoint,
  getFurtwangenFriedrichStreetThreeTravelPoint,
  getFurtwangenFriedrichStreetTwoTravelPoint,
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint,
  getFurtwangenUniversityTravelPoint
} from '../objectmothers/travel-point-object-mother';
import { of } from 'rxjs';
import { expect } from '@jest/globals';


describe('TravelPointApiService', () => {
  let getAddressesGQLSpy: jasmine.Spy;
  let getNearestAddressesGQLSpy: jasmine.Spy;
  let getNearestStationsGQLSpy: jasmine.Spy;
  let classUnderTest: TravelPointApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const getAddressesGQL: GetAddressesGQL = TestBed.inject(GetAddressesGQL);
    classUnderTest = TestBed.inject(TravelPointApiService);
    const getNearestAddressesGQl: GetNearestAddressesGQL = TestBed.inject(GetNearestAddressesGQL);
    classUnderTest = TestBed.inject(TravelPointApiService);
    const getNearestStationsGQL: GetNearestStationsGQL = TestBed.inject(GetNearestStationsGQL);

    getAddressesGQLSpy = spyOn(getAddressesGQL, 'watch').and.returnValue(
      {
        valueChanges: of({
          data: {
            getAutocompleteAddressesBy: [
              getFurtwangenUniversityTravelPoint(),
              getFurtwangenUniversityTravelPoint()
            ]
          }
        })
      }
    );

    getNearestAddressesGQLSpy = spyOn(getNearestAddressesGQl, 'watch').and.returnValue(
      {
        valueChanges: of({
          data: {
            getNearestAddressesBy: [
              getFurtwangenSupermarketTravelPoint(),
              getFurtwangenKindergardenTravelPoint(),
              getFurtwangenFriedrichStreetOneTravelPoint(),
              getFurtwangenFriedrichStreetTwoTravelPoint(),
              getFurtwangenFriedrichStreetThreeTravelPoint()
            ]
          }
        })
      }
    );

    getNearestStationsGQLSpy = spyOn(getNearestStationsGQL, 'watch').and.returnValue(
      {
        valueChanges: of({
          data: {
            getNearestStationsBy: [
              getFurtwangenSupermarketTravelPoint(),
              getFurtwangenKindergardenTravelPoint(),
              getFurtwangenFriedrichStreetOneTravelPoint(),
              getFurtwangenFriedrichStreetTwoTravelPoint(),
              getFurtwangenFriedrichStreetThreeTravelPoint()
            ]
          }
        })
      }
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should GET a list of TravelPoints when getAddressesBy text is called', (done) => {
    const testText = 'Am Großhausberg 8';

    classUnderTest.getAddressesBy(testText).subscribe((result: AutocompleteAddressFragment[]) => {
      expect(result.length).toBe(2);
      expect(result[0]).toEqual(getFurtwangenUniversityTravelPoint());
      expect(result[1]).toEqual(getFurtwangenUniversityTravelPoint());
      done();
    });
  });

  it('should be called "getAddressesGQL" correctly and with right params', (done) => {
    const testText = 'Am Großhausberg 8';

    classUnderTest.getAddressesBy(testText).subscribe(() => {
      expect(getAddressesGQLSpy).toHaveBeenCalledTimes(1);
      expect(getAddressesGQLSpy).toHaveBeenCalledWith({
        text: testText
      });
      done();
    });
  });

  it('should GET a list of travelPoints when getNearestAddressesBy longitude and latitude is called', (done) => {
    const testLongitude = 10.0;
    const testLatitude = 10.0;
    const testRadiusInKilometers = 5;

    classUnderTest.getNearestAddressesBy(testLongitude, testLatitude, testRadiusInKilometers).subscribe((result: NearestTravelPointFragment[]) => {
      expect(result.length).toBe(5);
      expect(result[0]).toEqual(getFurtwangenSupermarketTravelPoint());
      expect(result[1]).toEqual(getFurtwangenKindergardenTravelPoint());
      expect(result[2]).toEqual(getFurtwangenFriedrichStreetOneTravelPoint());
      expect(result[3]).toEqual(getFurtwangenFriedrichStreetTwoTravelPoint());
      expect(result[4]).toEqual(getFurtwangenFriedrichStreetThreeTravelPoint());
      done();
    });
  });

  it('should be called "getNearestAddressesGQL" correctly and with right params', (done) => {
    const testLongitude = 10.0;
    const testLatitude = 10.0;
    const testRadiusInKilometers = 5;

    classUnderTest.getNearestAddressesBy(testLongitude, testLatitude, testRadiusInKilometers).subscribe(() => {
      expect(getNearestAddressesGQLSpy).toHaveBeenCalledTimes(1);
      expect(getNearestAddressesGQLSpy).toHaveBeenCalledWith({
        longitude: testLongitude,
        latitude: testLatitude,
        radiusInKilometers: testRadiusInKilometers
      });
      done();
    });
  });

  it('should GET a list of travelPoints when getNearestStationsBy longitude and latitude is called', (done) => {
    const testLongitude = 10.0;
    const testLatitude = 10.0;
    const testRadiusInKilometers = 5;

    classUnderTest.getNearestStationsBy(testLongitude, testLatitude, testRadiusInKilometers).subscribe((result: NearestTravelPointFragment[]) => {
      expect(result.length).toBe(5);
      expect(result[0]).toEqual(getFurtwangenSupermarketTravelPoint());
      expect(result[1]).toEqual(getFurtwangenKindergardenTravelPoint());
      expect(result[2]).toEqual(getFurtwangenFriedrichStreetOneTravelPoint());
      expect(result[3]).toEqual(getFurtwangenFriedrichStreetTwoTravelPoint());
      expect(result[4]).toEqual(getFurtwangenFriedrichStreetThreeTravelPoint());
      done();
    });
  });

  it('should be called "getNearestStationsGQL" correctly and with right params', (done) => {
    const testLongitude = 10.0;
    const testLatitude = 10.0;
    const testRadiusInKilometers = 5;

    classUnderTest.getNearestStationsBy(testLongitude, testLatitude, testRadiusInKilometers).subscribe(() => {
      expect(getNearestStationsGQLSpy).toHaveBeenCalledTimes(1);
      expect(getNearestStationsGQLSpy).toHaveBeenCalledWith({
        longitude: testLongitude,
        latitude: testLatitude,
        radiusInKilometers: testRadiusInKilometers
      });
      done();
    });
  });
});
