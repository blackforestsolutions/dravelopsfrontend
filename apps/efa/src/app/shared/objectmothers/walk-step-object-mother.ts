import { CompassDirection, WalkingDirection, WalkStep } from '@dravelopsfrontend/generated-content';

const DEFAULT_TEST_PATH_STREET_NAME = 'Weg';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getWalkStepWithNoEmptyFields = (): WalkStep => {
  return {
    streetName: DEFAULT_TEST_PATH_STREET_NAME,
    distanceInKilometers: 1.253,
    startPoint: {
      x: 8.209198,
      y: 48.048381
    },
    endPoint: {
      x: 7.891595,
      y: 48.087517
    },
    walkingDirection: WalkingDirection.RIGHT,
    compassDirection: CompassDirection.NORTH,
    circleExit: '3',
    isStreetNameGenerated: false,
    isOriginPoint: false,
    isDestinationPoint: false
  };
};
