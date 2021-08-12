import { SortJourneyPipe } from './sort-journey.pipe';
import { expect } from '@jest/globals';
import { JourneyFragment } from '../../../domain/model/generated';
import {
  getFurtwangenToWaldkirchJourneyByArrivalTime,
  getWaldkirchToFurtwangenJourneyByDepartureTime
} from '../../../domain/objectmothers/journey-object-mother';

describe('SortJourneyPipe', () => {

  const classUnderTest: SortJourneyPipe = new SortJourneyPipe();

  it('create an instance', () => {
    const pipe = new SortJourneyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null when journeys are null', () => {
    const testJourneys: JourneyFragment[] = null;

    const result: JourneyFragment[] = classUnderTest.transform(testJourneys, false);

    expect(result).toBeNull();
  });

  it('should sort journeys correctly by departure time', () => {
    const testJourneys: JourneyFragment[] = [
      getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2020-09-30T13:10:13+02:00')),
      getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2021-01-01T13:08:13+02:00')),
      getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2020-10-01T13:08:13+02:00')),
      getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2020-09-30T13:08:13+02:00'))
    ];

    const result: JourneyFragment[] = classUnderTest.transform(testJourneys, false);

    expect(result.length).toBe(4);
    expect(result[0]).toEqual(getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2020-09-30T13:08:13+02:00')));
    expect(result[1]).toEqual(getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2020-09-30T13:10:13+02:00')));
    expect(result[2]).toEqual(getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2020-10-01T13:08:13+02:00')));
    expect(result[3]).toEqual(getWaldkirchToFurtwangenJourneyByDepartureTime(new Date('2021-01-01T13:08:13+02:00')));
  });


  it('should sort journeys correctly by arrival time', () => {
    const testJourneys: JourneyFragment[] = [
      getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2020-09-30T13:08:13+02:00')),
      getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2021-01-01T13:08:13+02:00')),
      getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2020-10-01T13:08:13+02:00')),
      getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2020-09-30T13:10:13+02:00'))
    ];

    const result: JourneyFragment[] = classUnderTest.transform(testJourneys, true);

    expect(result.length).toBe(4);
    expect(result[0]).toEqual(getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2020-09-30T13:08:13+02:00')));
    expect(result[1]).toEqual(getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2020-09-30T13:10:13+02:00')));
    expect(result[2]).toEqual(getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2020-10-01T13:08:13+02:00')));
    expect(result[3]).toEqual(getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2021-01-01T13:08:13+02:00')));
  });


});
