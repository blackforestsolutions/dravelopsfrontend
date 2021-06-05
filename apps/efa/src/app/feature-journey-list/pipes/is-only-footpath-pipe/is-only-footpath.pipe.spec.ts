import { IsOnlyFootpathPipe } from './is-only-footpath.pipe';
import { JourneyFragment } from '../../../shared/model/generated';
import {
  getFurtwangenToWaldkirchJourney,
  getGrosshausbergToFurtwangenIlbenstreetJourney
} from '../../../shared/objectmothers/journey-object-mother';

describe('IsOnlyFootpathPipe', () => {

  const classUnderTest: IsOnlyFootpathPipe = new IsOnlyFootpathPipe();

  it('create an instance', () => {
    const pipe = new IsOnlyFootpathPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null when journey is null', () => {
    const testJourney: JourneyFragment = null;

    const result: boolean = classUnderTest.transform(testJourney);

    expect(result).toBeNull();
  });

  it('should return true when journey has only one footpath', () => {
    const testJourney: JourneyFragment = getGrosshausbergToFurtwangenIlbenstreetJourney();

    const result: boolean = classUnderTest.transform(testJourney);

    expect(result).toBeTruthy();
  });

  it('should return false when journey has more than one leg', () => {
    const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();

    const result: boolean = classUnderTest.transform(testJourney);

    expect(result).toBeFalsy();
  });
});
