import { WalkingDirectionPipe } from './walking-direction.pipe';
import { CompassDirectionPipe } from '../compass-direction-pipe/compass-direction.pipe';
import { WalkingDirection, WalkStep } from '@dravelopsfrontend/generated-content';

describe('WalkingDirectionPipe', () => {

  const compassDirectionPipe: CompassDirectionPipe = new CompassDirectionPipe();

  const pipeUnderTest: WalkingDirectionPipe = new WalkingDirectionPipe(compassDirectionPipe);

  beforeEach(() => spyOn(compassDirectionPipe, 'transform').and.returnValue('Norden'));

  it('create an instance', () => {
    expect(pipeUnderTest).toBeTruthy();
  });

  it('should return correct message when walkingDirection = CONTINUE and isStreetNameGenerated = false', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.CONTINUE,
      isStreetNameGenerated: false,
      streetName: 'Eiderstraße'
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Weiter auf Eiderstraße');
  });

  it('should return correct message when walkingDirection = CONTINUE and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.CONTINUE,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Weiter');
  });

  it('should return correct message when walkingDirection = HARD_LEFT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.HARD_LEFT,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Scharf links abbiegen');
  });

  it('should return correct message when walkingDirection = LEFT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.LEFT,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Links abbiegen');
  });

  it('should return correct message when walkingDirection = SLIGHTLY_LEFT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.SLIGHTLY_LEFT,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Leicht links abbiegen');
  });

  it('should return correct message when walkingDirection = HARD_RIGHT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.HARD_RIGHT,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Scharf rechts abbiegen');
  });

  it('should return correct message when walkingDirection = RIGHT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.RIGHT,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Rechts abbiegen');
  });

  it('should return correct message when walkingDirection = SLIGHTLY_RIGHT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.SLIGHTLY_RIGHT,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Leicht rechts abbiegen');
  });

  it('should return correct message when walkingDirection = CIRCLE_CLOCKWISE and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.CIRCLE_CLOCKWISE,
      isStreetNameGenerated: true,
      circleExit: '1'
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Im Kreisverkehr im Uhrzeigersinn 1. Ausfahrt nehmen');
  });

  it('should return correct message when walkingDirection = CIRCLE_COUNTERCLOCKWISE and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.CIRCLE_COUNTERCLOCKWISE,
      isStreetNameGenerated: true,
      circleExit: '1'
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Im Kreisverkehr gegen den Uhrzeigersinn 1. Ausfahrt nehmen');
  });

  it('should return correct message when walkingDirection = ELEVATOR and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.ELEVATOR,
      isStreetNameGenerated: true,
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Mit dem Aufzug fahren');
  });

  it('should return correct message when walkingDirection = UTURN_LEFT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.UTURN_LEFT,
      isStreetNameGenerated: true,
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Nach links umdrehen');
  });

  it('should return correct message when walkingDirection = UTURN_RIGHT and isStreetNameGenerated = true', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.UTURN_RIGHT,
      isStreetNameGenerated: true,
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Nach rechts umdrehen');
  });

  it('should return no message when walkingDirection = unknown', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: null,
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('');
  });

  it('should return correct message when walkStep walkingDirection is DEPART, walkStep street name is generated and nextWalkStep is null', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.DEPART,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = null;

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Nach Norden');
  });

  it('should return correct message when walkStep walkingDirection is DEPART, walkStep street name is generated and nextWalkStep is street name is generated', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.DEPART,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = {
      isStreetNameGenerated: true
    };

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Nach Norden');
  });

  it('should return correct message when walkStep walkingDirection is DEPART, walkStep street name is generated and nextWalkStep is street name is not generated', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.DEPART,
      isStreetNameGenerated: true
    };
    const testNextWalkStep: WalkStep = {
      isStreetNameGenerated: false,
      streetName: 'Tanneck'
    };

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Nach Norden Richtung Tanneck');
  });

  it('should return correct message when walkStep walkingDirection is DEPART, walkStep street name is not generated and nextWalkStep is street name is not generated', () => {
    const testWalkStep: WalkStep = {
      walkingDirection: WalkingDirection.DEPART,
      isStreetNameGenerated: false,
      streetName: 'Eiderstraße'
    };
    const testNextWalkStep: WalkStep = {
      isStreetNameGenerated: false,
      streetName: 'Tanneck'
    };

    const result: string = pipeUnderTest.transform(testWalkStep, testNextWalkStep);

    expect(result).toBe('Auf Eiderstraße nach Norden Richtung Tanneck');
  });
});
