import { FilterEqualJourneysPipe } from './filter-equal-journeys.pipe';
import { JourneyFragment } from '../../../shared/model/generated';
import {
  getFurtwangenToWaldkirchJourney,
  getFurtwangenToWaldkirchJourneyById,
  getWaldkirchToFurtwangenJourney
} from '../../../shared/objectmothers/journey-object-mother';
import { expect } from '@jest/globals';

const TEST_UUID_1 = '34bed9ac-c895-4510-92b9-055c0d2fe45f';
const TEST_UUID_2 = '8b5e85d7-c2e6-4966-bc25-98590e094cf6';

describe('EqualJourneyFilterPipe', () => {

  const classUnderTest: FilterEqualJourneysPipe = new FilterEqualJourneysPipe();

  it('create an instance', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return null when journeys are null', () => {

    const result: JourneyFragment[] = classUnderTest.transform(
      null
    );

    expect(result).toBeNull();
  });

  it('should return an empty array when test journeys length is zero', () => {
    const testJourneys: JourneyFragment[] = [];

    const result: JourneyFragment[] = classUnderTest.transform(
      testJourneys
    );

    expect(result.length).toBe(0);
  });

  it('should reduce two equal journeys to one journey without comparing the id', () => {
    const testJourneys: JourneyFragment[] = [
      getFurtwangenToWaldkirchJourneyById(TEST_UUID_1),
      getFurtwangenToWaldkirchJourneyById(TEST_UUID_2)
    ];

    const result: JourneyFragment[] = classUnderTest.transform(
      testJourneys
    );

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(getFurtwangenToWaldkirchJourneyById(TEST_UUID_1));
  });

  it('should return two journeys when both journeys are different', () => {
    const testJourneys: JourneyFragment[] = [
      getFurtwangenToWaldkirchJourney(),
      getWaldkirchToFurtwangenJourney()
    ];

    const result: JourneyFragment[] = classUnderTest.transform(
      testJourneys
    );

    expect(result.length).toBe(2);
    expect(result[0]).toEqual(getFurtwangenToWaldkirchJourney());
    expect(result[1]).toEqual(getWaldkirchToFurtwangenJourney());
  });
});
