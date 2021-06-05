import { BackwardJourneyFilterPipe } from './backward-journey-filter.pipe';
import { JourneyFragment } from '../../../shared/model/generated';
import { expect } from '@jest/globals';
import {
  getFurtwangenToWaldkirchJourney,
  getFurtwangenToWaldkirchJourneyByArrivalTime,
  getWaldkirchToFurtwangenJourneyByDepartureTime
} from '../../../shared/objectmothers/journey-object-mother';

describe('BackwardJourneyFilterPipe', () => {

  const classUnderTest: BackwardJourneyFilterPipe = new BackwardJourneyFilterPipe();

  it('create an instance', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return null when journeys are null', () => {
    const testOutwardJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();

    const result: JourneyFragment[] = classUnderTest.transform(
      null,
      testOutwardJourney
    );

    expect(result).toBeNull();
  });

  it('should return an empty array when no journeys are found', () => {
    const testOutwardJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();
    const testJourneys: JourneyFragment[] = [];

    const result: JourneyFragment[] = classUnderTest.transform(
      testJourneys,
      testOutwardJourney
    );

    expect(result.length).toBe(0);
  });

  it('should return all backwardJourneys which are after selectedOutwardJourney', () => {
    const testOutwardJourney: JourneyFragment = getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2021-04-29T12:00:00+02:00'));
    const testJourneys: JourneyFragment[] = [
      getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2021-04-29T12:00:00+02:00')),
      getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2021-04-29T11:00:00+02:00')),
      getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2021-04-29T13:00:00+02:00'))
    ];

    const result: JourneyFragment[] = classUnderTest.transform(
      testJourneys,
      testOutwardJourney
    );

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2021-04-29T13:00:00+02:00')));
  });
});
