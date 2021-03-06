import { IsJourneyInPastPipe } from './is-journey-in-past.pipe';
import { JourneyFragment } from '../../../domain/model/generated';
import { getFurtwangenToWaldkirchJourneyByArrivalTime } from '../../../domain/objectmothers/journey-object-mother';

describe('IsJourneyInPastPipe', () => {

  const classUnderTest: IsJourneyInPastPipe = new IsJourneyInPastPipe();

  it('create an instance', () => {
    const pipe = new IsJourneyInPastPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null when journey is null', () => {
    const testJourney: JourneyFragment = null;

    const result: boolean = classUnderTest.transform(testJourney);

    expect(result).toBeNull();
  });

  it('should return true when journeys arrivalTime is is in past', () => {
    const testDate = new Date();
    testDate.setMilliseconds(testDate.getMilliseconds() - 1);
    const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourneyByArrivalTime(testDate);

    const result: boolean = classUnderTest.transform(testJourney);

    expect(result).toBeTruthy();
  });

  it('should return false when journeys arrivalTime is not in past', () => {
    const testDate = new Date();
    testDate.setMilliseconds(testDate.getMilliseconds() + 1);
    const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourneyByArrivalTime(testDate);

    const result: boolean = classUnderTest.transform(testJourney);

    expect(result).toBeFalsy();
  });
});
