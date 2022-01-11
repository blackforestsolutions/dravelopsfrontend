import { DistanceInMetresPipe } from './distance-in-metres.pipe';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../../domain/model/generated';
import {
  getFurtwangenSupermarketTravelPoint,
  getFurtwangenUniversityTravelPoint
} from '../../../domain/objectmothers/travel-point-object-mother';
import { expect } from '@jest/globals';

describe('DistanceInMetresPipe', () => {

  const pipeUnderTest: DistanceInMetresPipe = new DistanceInMetresPipe();

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return null when travelPoint input is null', () => {
    const testTravelPoint: AutocompleteAddressFragment | NearestTravelPointFragment = null;

    const result: string = pipeUnderTest.transform(testTravelPoint);

    expect(result).toBeNull();
  });

  it('should return an empty string when property "distanceInKilometers" is not available', () => {
    const testTravelPoint: AutocompleteAddressFragment | NearestTravelPointFragment = getFurtwangenUniversityTravelPoint();

    const result: string = pipeUnderTest.transform(testTravelPoint);

    expect(result).toBe('');
  });

  it('should return a string when property "distanceInKilometers" is available with correct distance in metres', () => {
    const testTravelPoint: AutocompleteAddressFragment | NearestTravelPointFragment = getFurtwangenSupermarketTravelPoint();

    const result: string = pipeUnderTest.transform(testTravelPoint);

    expect(result).toBe('123 m');
  });
});
