import { WalkStepArrowIconPipe } from './walk-step-arrow-icon.pipe';
import { WalkingDirection, WalkStep } from '@dravelopsfrontend/generated-content';
import { getWalkStepWithNoEmptyFields } from '../../../shared/objectmothers/walk-step-object-mother';

describe('WalkStepArrowIconPipe', () => {

  let pipeUnderTest: WalkStepArrowIconPipe;

  beforeEach(() => pipeUnderTest = new WalkStepArrowIconPipe());

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return "place" when "isOriginPoint" is true and "isDestinationPoint" is false', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      isOriginPoint: true
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('place');
  });

  it('should return "place" when "isOriginPoint" is false and "isDestinationPoint" is true', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      isDestinationPoint: true
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('place');
  });

  it('should return "arrow_upward" when walkingDirection is DEPART, ', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.DEPART
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('arrow_upward');
  });

  it('should return "arrow_upward" when walkingDirection is CONTINUE', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.CONTINUE
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('arrow_upward');
  });

  it('should return "subdirectory_arrow_left" when walkingDirection is HARD_LEFT', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.HARD_LEFT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('subdirectory_arrow_left');
  });

  it('should return "subdirectory_arrow_left" when walkingDirection is LEFT', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.LEFT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('subdirectory_arrow_left');
  });

  it('should return "subdirectory_arrow_left" when walkingDirection is SLIGHTLY_LEFT', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.SLIGHTLY_LEFT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('subdirectory_arrow_left');
  });

  it('should return "subdirectory_arrow_right" when walkingDirection is HARD_RIGHT', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.HARD_RIGHT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('subdirectory_arrow_right');
  });

  it('should return "subdirectory_arrow_right" when walkingDirection is RIGHT', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.RIGHT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('subdirectory_arrow_right');
  });

  it('should return "subdirectory_arrow_right" when walkingDirection is SLIGHTLY_RIGHT', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.SLIGHTLY_RIGHT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('subdirectory_arrow_right');
  });

  it('should return "adjust" when walkingDirection is CIRCLE_CLOCKWISE', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.CIRCLE_CLOCKWISE
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('adjust');
  });

  it('should return "adjust" when walkingDirection is CIRCLE_COUNTERCLOCKWISE', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.CIRCLE_COUNTERCLOCKWISE
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('adjust');
  });

  it('should return "elevator" when walkingDirection is ELEVATOR', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.ELEVATOR
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('elevator');
  });

  it('should return "rotate_left" when walkingDirection is UTURN_LEFT', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.UTURN_LEFT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('rotate_left');
  });

  it('should return "rotate_right" when walkingDirection is UTURN_RIGHT', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: WalkingDirection.UTURN_RIGHT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('rotate_right');
  });

  it('should return "help" whenn no walkingDirection is found, isOriginPoint is false and isDestinationPoint is false', () => {
    const testWalkStep: WalkStep = {
      ...getWalkStepWithNoEmptyFields(),
      walkingDirection: null
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('help');
  });
});
