import { TravelPointSearchTitlePipe } from './travel-point-search-title.pipe';
import { TravelPointSearchParams } from '../../travel-point-search/travel-point-search.component';
import { expect } from '@jest/globals';

describe('TravelPointSearchTitlePipe', () => {

  const pipeUnderTest: TravelPointSearchTitlePipe = new TravelPointSearchTitlePipe();

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return null when travelPointSearchParams are null', () => {
    const testTravelPointSearchParams: TravelPointSearchParams = null;

    const result: string = pipeUnderTest.transform(testTravelPointSearchParams);

    expect(result).toBeNull();
  });

  it('should return "Start und Ziel" when searchType for travel point list is "map"', () => {
    const testTravelPointSearchParams: TravelPointSearchParams = {
      searchType: 'map',
      locationType: 'departure'
    };

    const result: string = pipeUnderTest.transform(testTravelPointSearchParams);

    expect(result).toBe('Start und Ziel');
  });

  it('should return "Start" when searchType is "map" and locationType is "departure"', () => {
    const testTravelPointSearchParams: TravelPointSearchParams = {
      searchType: 'autocomplete',
      locationType: 'departure'
    };

    const result: string = pipeUnderTest.transform(testTravelPointSearchParams);

    expect(result).toBe('Start');
  });

  it('should return "Ziel" when searchType is "map" and locationType is "arrival"', () => {
    const testTravelPointSearchParams: TravelPointSearchParams = {
      searchType: 'autocomplete',
      locationType: 'arrival'
    };

    const result: string = pipeUnderTest.transform(testTravelPointSearchParams);

    expect(result).toBe('Ziel');
  });
});
