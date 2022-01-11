import { TravelPointTouchFilterPipe } from './travel-point-touch-filter-.pipe';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../../domain/model/generated';
import { expect } from '@jest/globals';
import {
  getFurtwangenFriedrichStreetFourTravelPoint,
  getFurtwangenFriedrichStreetOneTravelPoint,
  getFurtwangenFriedrichStreetThreeTravelPoint,
  getFurtwangenFriedrichStreetTwoTravelPoint,
  getFurtwangenKindergardenTravelPoint,
  getFurtwangenSupermarketTravelPoint
} from '../../../domain/objectmothers/travel-point-object-mother';

describe('TravelPointTouchFilterPipe', () => {
  const maxTravelPointsInSmallView = 5;
  let breakpointObserver: BreakpointObserver;

  let pipeUnderTest: TravelPointTouchFilterPipe;

  beforeEach(() => {
    breakpointObserver = { isMatched: jest.fn() } as unknown as BreakpointObserver;
    pipeUnderTest = new TravelPointTouchFilterPipe(maxTravelPointsInSmallView, breakpointObserver);
  });

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return null when travelPoints are null', () => {
    const testTravelPoints: AutocompleteAddressFragment[] | NearestTravelPointFragment[] = null;

    const result: AutocompleteAddressFragment[] | NearestTravelPointFragment[] = pipeUnderTest.transform(testTravelPoints);

    expect(result).toBeNull();
  });

  it('should return same travelPoints when it is desktop view', () => {
    const breakpointObserverSpy: jest.SpyInstance = jest.spyOn(breakpointObserver, 'isMatched').mockReturnValue(false);
    const testTravelPoints: AutocompleteAddressFragment[] | NearestTravelPointFragment[] = [
      getFurtwangenSupermarketTravelPoint(),
      getFurtwangenKindergardenTravelPoint(),
      getFurtwangenFriedrichStreetOneTravelPoint(),
      getFurtwangenFriedrichStreetTwoTravelPoint(),
      getFurtwangenFriedrichStreetThreeTravelPoint(),
      getFurtwangenFriedrichStreetFourTravelPoint()
    ];

    const result: AutocompleteAddressFragment[] | NearestTravelPointFragment[] = pipeUnderTest.transform(testTravelPoints);

    expect(result.length).toBe(testTravelPoints.length);
    expect(result).toEqual(testTravelPoints);
    expect(breakpointObserverSpy).toHaveBeenCalledTimes(1);
    expect(breakpointObserverSpy).toHaveBeenCalledWith('(max-width: 850px)');
  });

  it('should return only five travelPoints when it is touch view and six travelPoints are provided', () => {
    const breakpointObserverSpy: jest.SpyInstance = jest.spyOn(breakpointObserver, 'isMatched').mockReturnValue(true);
    const testTravelPoints: AutocompleteAddressFragment[] | NearestTravelPointFragment[] = [
      getFurtwangenSupermarketTravelPoint(),
      getFurtwangenKindergardenTravelPoint(),
      getFurtwangenFriedrichStreetOneTravelPoint(),
      getFurtwangenFriedrichStreetTwoTravelPoint(),
      getFurtwangenFriedrichStreetThreeTravelPoint(),
      getFurtwangenFriedrichStreetFourTravelPoint()
    ];

    const result: AutocompleteAddressFragment[] | NearestTravelPointFragment[] = pipeUnderTest.transform(testTravelPoints);

    expect(result.length).toBe(maxTravelPointsInSmallView);
    expect(result).toEqual([
      getFurtwangenSupermarketTravelPoint(),
      getFurtwangenKindergardenTravelPoint(),
      getFurtwangenFriedrichStreetOneTravelPoint(),
      getFurtwangenFriedrichStreetTwoTravelPoint(),
      getFurtwangenFriedrichStreetThreeTravelPoint()
    ]);
    expect(breakpointObserverSpy).toHaveBeenCalledTimes(1);
    expect(breakpointObserverSpy).toHaveBeenCalledWith('(max-width: 850px)');
  });

  it('should return four travelPoints when it is touch view and four travelPoints are provided', () => {
    const breakpointObserverSpy: jest.SpyInstance = jest.spyOn(breakpointObserver, 'isMatched').mockReturnValue(true);
    const testTravelPoints: AutocompleteAddressFragment[] | NearestTravelPointFragment[] = [
      getFurtwangenSupermarketTravelPoint(),
      getFurtwangenKindergardenTravelPoint(),
      getFurtwangenFriedrichStreetOneTravelPoint(),
      getFurtwangenFriedrichStreetTwoTravelPoint()
    ];

    const result: AutocompleteAddressFragment[] | NearestTravelPointFragment[] = pipeUnderTest.transform(testTravelPoints);

    expect(result.length).toBe(4);
    expect(result).toEqual(testTravelPoints);
    expect(breakpointObserverSpy).toHaveBeenCalledTimes(1);
    expect(breakpointObserverSpy).toHaveBeenCalledWith('(max-width: 850px)');
  });
});
