import { WalkStepDescriptionPipe } from './walk-step-description.pipe';
import { OriginPointPipe } from '../origin-point-pipe/origin-point.pipe';
import { CompassDirectionPipe } from '../compass-direction-pipe/compass-direction.pipe';
import { DestinationPointPipe } from '../destination-point-pipe/destination-point.pipe';
import { WalkingDirectionPipe } from '../walking-direction-pipe/walking-direction.pipe';
import { WalkStep } from '../../../domain/model/generated';

describe('WalkStepDescriptionPipe', () => {

  const compassDirectionPipe: CompassDirectionPipe = new CompassDirectionPipe();
  const originPointPipe: OriginPointPipe = new OriginPointPipe(compassDirectionPipe);
  const destinationPointPipe: DestinationPointPipe = new DestinationPointPipe();
  const walkingDirectionPipe: WalkingDirectionPipe = new WalkingDirectionPipe(compassDirectionPipe);

  const pipeUnderTest: WalkStepDescriptionPipe = new WalkStepDescriptionPipe(
    originPointPipe,
    destinationPointPipe,
    walkingDirectionPipe
  );

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should be called "destinationPointPipe" when isDestinationPoint = true, isOriginPoint = true', () => {
    const testMessage = 'Ziel scharf links';
    const destinationPointPipeSpy = jest.spyOn(destinationPointPipe, 'transform').mockReturnValue(testMessage);
    const testWalkStep: WalkStep = {
      isDestinationPoint: true,
      isOriginPoint: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe(testMessage);
    expect(destinationPointPipeSpy).toHaveBeenCalledTimes(1);
    expect(destinationPointPipeSpy).toHaveBeenCalledWith(testWalkStep);
  });

  it('should be called "originPointPipe" when isDestinationPoint = false, isOriginPoint = true', () => {
    const testMessage = 'Ziel nach Norden Richtung Tanneck';
    const originPointPipeSpy = jest.spyOn(originPointPipe, 'transform').mockReturnValue(testMessage);
    const testWalkStep: WalkStep = {
      isDestinationPoint: false,
      isOriginPoint: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe(testMessage);
    expect(originPointPipeSpy).toHaveBeenCalledTimes(1);
    expect(originPointPipeSpy).toHaveBeenCalledWith(testWalkStep, testNextWalkStep);
  });

  it('should be called "walkingDirectionPipe" when isDestinationPoint = false, isOriginPoint = false', () => {
    const testMessage = 'Weiter auf Eiderstraße';
    const walkingDirectionPipeSpy = jest.spyOn(walkingDirectionPipe, 'transform').mockReturnValue(testMessage);
    const testWalkStep: WalkStep = {
      isDestinationPoint: false,
      isOriginPoint: false
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe(testMessage);
    expect(walkingDirectionPipeSpy).toHaveBeenCalledTimes(1);
    expect(walkingDirectionPipeSpy).toHaveBeenCalledWith(testWalkStep, testNextWalkStep);
  });
});
