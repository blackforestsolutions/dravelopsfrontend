import { OriginPointPipe } from './origin-point.pipe';
import { CompassDirectionPipe } from '../compass-direction-pipe/compass-direction.pipe';
import { WalkStep } from '@dravelopsfrontend/generated-content';

describe('OriginPointPipe', () => {

  const compassDirectionPipe = new CompassDirectionPipe();

  const pipeUnderTest: OriginPointPipe = new OriginPointPipe(compassDirectionPipe);

  beforeEach(() => spyOn(compassDirectionPipe, 'transform').and.returnValue('Norden'));

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return correct message walkStep when street name is generated and nextWalkStep is null', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Start nach Norden');
  });

  it('should return correct message when walkStep street name is generated and nextWalkStep street name is generated', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = {
      isStreetNameGenerated: true
    };

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Start nach Norden');
  });

  it('should return correct message when walkStep street name is generated and nextWalkStep street name is not generated', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = {
      isStreetNameGenerated: false,
      streetName: 'Tanneck'
    };

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Start nach Norden Richtung Tanneck');
  });

  it('should return correct message when walkStep street name is not generated and nextWalkStep street name is not generated', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: false,
      streetName: 'Eiderstraße'
    };
    const testNextWalkStep: WalkStep = {
      isStreetNameGenerated: false,
      streetName: 'Tanneck'
    };

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Start auf Eiderstraße nach Norden Richtung Tanneck');
  });
});
