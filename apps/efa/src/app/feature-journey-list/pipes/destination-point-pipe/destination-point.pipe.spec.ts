import { DestinationPointPipe } from './destination-point.pipe';
import { WalkingDirection, WalkStep } from '@dravelopsfrontend/generated-content';

describe('DestinationPointPipe', () => {

  const pipeUnderTest: DestinationPointPipe = new DestinationPointPipe();

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return correct message when walkingDirection = HARD LEFT and isStreetNameGenerated = false', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: false,
      walkingDirection: WalkingDirection.HARD_LEFT,
      streetName: 'Tanneck 1B'
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel Tanneck 1B scharf links');
  });

  it('should return correct message when walkingDirection = CONTINUE and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.CONTINUE
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel auf diesem Weg');
  });

  it('should return correct message when walkingDirection = DEPART and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.DEPART
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel auf diesem Weg');
  });

  it('should return correct message when walkingDirection = HARD_LEFT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.HARD_LEFT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel scharf links');
  });

  it('should return correct message when walkingDirection = LEFT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.LEFT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel auf der linken Seite');
  });

  it('should return correct message when walkingDirection = UTURN_LEFT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.UTURN_LEFT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel auf der linken Seite');
  });

  it('should return correct message when walkingDirection = SLIGHTLY_LEFT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.SLIGHTLY_LEFT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel leicht links');
  });

  it('should return correct message when walkingDirection = HARD_RIGHT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.HARD_RIGHT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel scharf rechts');
  });

  it('should return correct message when walkingDirection = RIGHT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.RIGHT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel auf der rechten Seite');
  });

  it('should return correct message when walkingDirection = UTURN_RIGHT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.UTURN_RIGHT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel auf der rechten Seite');
  });

  it('should return correct message when walkingDirection = SLIGHTLY_RIGHT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.SLIGHTLY_RIGHT
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel leicht rechts');
  });

  it('should return correct message when walkingDirection = CIRCLE_CLOCKWISE and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.CIRCLE_CLOCKWISE
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel im Kreisverkehr');
  });

  it('should return correct message when walkingDirection = CIRCLE_COUNTERCLOCKWISE and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.CIRCLE_COUNTERCLOCKWISE
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel im Kreisverkehr');
  });

  it('should return correct message when walkingDirection = ELEVATOR and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: WalkingDirection.ELEVATOR
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel am Aufzug');
  });

  it('should return correct message when walkingDirection = unknown and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      isStreetNameGenerated: true,
      walkingDirection: null
    };

    const result: string = pipeUnderTest.transform(testWalkStep);

    expect(result).toBe('Ziel erreicht');
  });
});
