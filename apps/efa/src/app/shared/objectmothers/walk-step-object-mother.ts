import { CompassDirection, WalkingDirection, WalkStep } from '@dravelopsfrontend/generated-content';

const DEFAULT_TEST_PATH_STREET_NAME = 'Weg';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenFriedrichStreetToIlbenStreetWalkSteps = (): WalkStep[] => {
  return [
    getFriedrichStreetWalkStep(),
    getLuisenStreetWalkStep()
  ];
};

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
    isStreetNameGenerated: true,
    isOriginPoint: false,
    isDestinationPoint: false
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFriedrichStreetWalkStep = (): WalkStep => {
  return {
    streetName: 'Friedrichstraße',
    distanceInKilometers: 0.189,
    startPoint: {
      x: 8.204263,
      y: 48.055321
    },
    endPoint: {
      x: 8.203450,
      y: 48.056931
    },
    walkingDirection: WalkingDirection.DEPART,
    compassDirection: CompassDirection.NORTH,
    isStreetNameGenerated: false,
    isOriginPoint: false,
    isDestinationPoint: false
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getLuisenStreetWalkStep = (): WalkStep => {
  return {
    streetName: 'Luisenstraße',
    distanceInKilometers: 0.313,
    startPoint: {
      x: 8.203450,
      y: 48.056931
    },
    endPoint: {
      x: 8.20257,
      y: 48.05939
    },
    walkingDirection: WalkingDirection.CONTINUE,
    compassDirection: CompassDirection.NORTHWEST,
    isStreetNameGenerated: false,
    isOriginPoint: false,
    isDestinationPoint: false
  };
};
