import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipeUnderTest: DurationPipe;

  beforeEach(() => {
    pipeUnderTest = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return eleven minutes in a formatted string on german summertime', () => {
    const testDepartureDate = new Date('2020-09-30T13:09:02+02:00');
    const testArrivalDate = new Date('2020-09-30T13:20:59+02:00');

    const result: string = pipeUnderTest.transform(testDepartureDate, testArrivalDate);

    expect(result).toEqual('00:11 h')
  });

  it('should return eleven minutes in a formatted string on german wintertime', () => {
    const testDepartureDate = new Date('2020-12-06T13:09:02+01:00');
    const testArrivalDate = new Date('2020-12-06T13:20:59+01:00');

    const result: string = pipeUnderTest.transform(testDepartureDate, testArrivalDate);

    expect(result).toEqual('00:11 h')
  });

  it('should return 10 minutes in a formatted string when departureDate and arrivalDate are on different days', () => {
    const testDepartureDate = new Date('2020-09-30T23:55:00+02:00');
    const testArrivalDate = new Date('2020-10-01T00:05:00+02:00');

    const result: string = pipeUnderTest.transform(testDepartureDate, testArrivalDate);

    expect(result).toEqual('00:10 h');
  });

  it('should return 72 hours in a formatted string when departureDate and arrivalDate have a gap of three days', () => {
    const testDepartureDate = new Date('2020-09-30T00:00:00+02:00');
    const testArrivalDate = new Date('2020-10-03T00:00:00+02:00');

    const result: string = pipeUnderTest.transform(testDepartureDate, testArrivalDate);

    expect(result).toEqual('72:00 h');
  });

  it('should return five minutes in a formatted string when ', () => {
    const testDepartureDate = new Date('2020-12-08T11:24:01+01:00');
    const testArrivalDate = new Date('2020-12-08T11:29:00+01:00');

    const result: string = pipeUnderTest.transform(testDepartureDate, testArrivalDate);

    expect(result).toEqual('00:05 h');
  });

});
