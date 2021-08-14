import {
  getBleibachSevTravelPoint,
  getFurtwangenIlbenstreetTravelPoint,
  getGrosshausbergTravelPoint,
  getGuetenbachTownHallTravelPoint,
  getKollnauTrainStationTravelPoint,
  getSickAgTravelPoint,
  getSimonswaldTownHallTravelPoint,
  getWaldkirchKastelberghalleTravelPoint,
  getWaldkirchTownCenterTravelPoint
} from './travel-point-object-mother';
import { getSuedbadenTravelProvider } from './travel-provider-object-mother';
import { Leg, VehicleType } from '../model/generated';
import { getExampleWaypoints } from './footpath-object-mother';
import { getExampleWalkSteps } from './walk-step-object-mother';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getGrosshausbergToFurtwangenIlbenstreetLeg = (arrivalTime?: Date): Leg => {
  return {
    ...getGrosshausbergToFurtwangenIlbenstreetBaseLeg(),
    departure: getGrosshausbergTravelPoint(
      undefined,
      new Date('2020-09-30T13:08:13+02:00')
    ),
    arrival: getFurtwangenIlbenstreetTravelPoint(
      arrivalTime ? arrivalTime : new Date('2020-09-30T13:20:59+02:00'),
      new Date('2020-09-30T13:21:00+02:00')
    )
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenIlbenstreetToGrosshausbergLeg = (): Leg => {
  return {
    ...getGrosshausbergToFurtwangenIlbenstreetBaseLeg(),
    departure: getFurtwangenIlbenstreetTravelPoint(
      new Date('2020-10-01T14:21:00+02:00'),
      new Date('2020-10-01T14:22:00+02:00')
    ),
    arrival: getGrosshausbergTravelPoint(
      new Date('2020-10-01T14:34:00+02:00'),
      undefined
    )
  };
};

const getGrosshausbergToFurtwangenIlbenstreetBaseLeg = (): Leg => {
  return {
    delayInMinutes: 0,
    distanceInKilometers: 0.977,
    vehicleType: VehicleType.WALK,
    waypoints: getExampleWaypoints(),
    vehicleNumber: '',
    vehicleName: '',
    intermediateStops: [],
    walkSteps: getExampleWalkSteps()
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenIlbenstreetToBleibachLeg = (): Leg => {
  return {
    ...getFurtwangenIlbenstreetToBleibachBaseLeg(),
    departure: getFurtwangenIlbenstreetTravelPoint(
      new Date('2020-09-30T13:52+02:00'),
      new Date('2020-09-30T13:21+02:00')
    ),
    arrival: getBleibachSevTravelPoint(
      new Date('2020-09-30T14:05+02:00'),
      new Date('2020-09-30T14:12+02:00')
    ),
    vehicleName: 'Furtwangen Rößleplatz - Waldkirch Gymnasium',
    intermediateStops: [
      getGuetenbachTownHallTravelPoint(
        new Date('2020-09-30T13:31+02:00'),
        new Date('2020-09-30T13:31+02:00')
      ),
      getSimonswaldTownHallTravelPoint(
        new Date('2020-09-30T13:52+02:00'),
        new Date('2020-09-30T13:52+02:00')
      )
    ]
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getBleibachToFurtwangenIlbenstreetLeg = (): Leg => {
  return {
    ...getFurtwangenIlbenstreetToBleibachBaseLeg(),
    departure: getBleibachSevTravelPoint(
      new Date('2020-10-01T13:30:00+02:00'),
      new Date('2020-10-01T13:37:00+02:00')
    ),
    arrival: getFurtwangenIlbenstreetTravelPoint(
      new Date('2020-10-01T14:21:00+02:00'),
      new Date('2020-10-01T14:22:00+02:00')
    ),
    vehicleName: 'Waldkirch Gymnasium - Furtwangen Rößleplatz',
    intermediateStops: [
      getSimonswaldTownHallTravelPoint(
        new Date('2020-10-01T13:50:00+02:00'),
        new Date('2020-10-01T13:50:00+02:00')
      ),
      getGuetenbachTownHallTravelPoint(
        new Date('2020-10-01T14:11:00+02:00'),
        new Date('2020-10-01T14:11:00+02:00')
      )
    ]
  };
};

const getFurtwangenIlbenstreetToBleibachBaseLeg = (): Leg => {
  return {
    delayInMinutes: 0,
    distanceInKilometers: 26.394,
    vehicleType: VehicleType.BUS,
    travelProvider: getSuedbadenTravelProvider(),
    waypoints: getExampleWaypoints(),
    vehicleNumber: '272'
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getBleibachToWaldkirchKastelberghalleLeg = (): Leg => {
  return {
    ...getBleibachToWaldkirchKastelberghalleBaseLeg(),
    departure: getBleibachSevTravelPoint(
      new Date('2020-09-30T14:05+02:00'),
      new Date('2020-09-30T14:12+02:00')
    ),
    arrival: getWaldkirchKastelberghalleTravelPoint(
      new Date('2020-09-30T14:29+02:00'),
      new Date('2020-09-30T14:29:01+02:00')
    ),
    vehicleName: 'Oberprechtal Forellenhof - Emmendingen Bahnhof/ZOB',
    intermediateStops: [
      getKollnauTrainStationTravelPoint(
        new Date('2020-09-30T14:22+02:00'),
        new Date('2020-09-30T14:22+02:00')
      ),
      getWaldkirchTownCenterTravelPoint(
        new Date('2020-09-30T14:26+02:00'),
        new Date('2020-09-30T14:26+02:00')
      )
    ]
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getWaldkirchKastelberghalleToBleibachLeg = (): Leg => {
  return {
    ...getBleibachToWaldkirchKastelberghalleBaseLeg(),
    departure: getWaldkirchKastelberghalleTravelPoint(
      new Date('2020-10-01T13:13:00+02:00'),
      new Date('2020-10-01T13:13:00+02:00')
    ),
    arrival: getBleibachSevTravelPoint(
      new Date('2020-10-01T13:30:00+02:00'),
      new Date('2020-10-01T13:37:00+02:00')
    ),
    vehicleName: 'Emmendingen Bahnhof/ZOB - Oberprechtal Forellenhof',
    intermediateStops: [
      getWaldkirchTownCenterTravelPoint(
        new Date('2020-10-01T13:16:00+02:00'),
        new Date('2020-10-01T13:16:00+02:00')
      ),
      getKollnauTrainStationTravelPoint(
        new Date('2020-10-01T13:20:00+02:00'),
        new Date('2020-10-01T13:20:00+02:00')
      )
    ]
  };
};

const getBleibachToWaldkirchKastelberghalleBaseLeg = (): Leg => {
  return {
    delayInMinutes: 0,
    distanceInKilometers: 6.784,
    vehicleType: VehicleType.BUS,
    travelProvider: getSuedbadenTravelProvider(),
    waypoints: getExampleWaypoints(),
    vehicleNumber: '201'
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 *
 */
export const getWaldkirchKastelberghalleToSickLeg = (): Leg => {
  return {
    ...getWaldkirchKastelberghalleToSickBaseLeg(),
    departure: getWaldkirchKastelberghalleTravelPoint(
      new Date('2020-09-30T14:26:00+02:00'),
      new Date('2020-09-30T14:29:00+02:00')
    ),
    arrival: getSickAgTravelPoint(
      new Date('2020-09-30T14:34:56+02:00'),
      undefined
    )
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 *
 */
export const getWaldkirchKastelberghalleToSickLegByArrivalTime = (arrivalTime: Date): Leg => {
  return {
    ...getWaldkirchKastelberghalleToSickLeg(),
    arrival: getSickAgTravelPoint(
      arrivalTime,
      undefined
    )
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSickToWaldkirchKastelberghalleLeg = (): Leg => {
  return {
    ...getWaldkirchKastelberghalleToSickBaseLeg(),
    departure: getSickAgTravelPoint(
      undefined,
      new Date('2020-10-01T13:08:00+02:00')
    ),
    arrival: getWaldkirchKastelberghalleTravelPoint(
      new Date('2020-10-01T13:13:00+02:00'),
      new Date('2020-10-01T13:13:00+02:00')
    )
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getSickToWaldkirchKastelberghalleLegByDepartureTime = (departureTime: Date): Leg => {
  return {
    ...getSickToWaldkirchKastelberghalleLeg(),
    departure: getSickAgTravelPoint(
      undefined,
      departureTime
    )
  };
};

const getWaldkirchKastelberghalleToSickBaseLeg = (): Leg => {
  return {
    delayInMinutes: 0,
    distanceInKilometers: 0.445,
    vehicleType: VehicleType.WALK,
    waypoints: getExampleWaypoints(),
    vehicleNumber: '',
    vehicleName: '',
    intermediateStops: [],
    walkSteps: getExampleWalkSteps()
  };
};

