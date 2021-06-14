import {
  getBleibachToFurtwangenIlbenstreetLeg,
  getBleibachToWaldkirchKastelberghalleLeg,
  getFurtwangenIlbenstreetToBleibachLeg,
  getFurtwangenIlbenstreetToGrosshausbergLeg,
  getGrosshausbergToFurtwangenIlbenstreetLeg,
  getSickToWaldkirchKastelberghalleLeg,
  getSickToWaldkirchKastelberghalleLegByDepartureTime,
  getWaldkirchKastelberghalleToBleibachLeg,
  getWaldkirchKastelberghalleToSickLeg,
  getWaldkirchKastelberghalleToSickLegByArrivalTime
} from './leg-object-mother';
import { getRegularPrice } from './price-object-mother';
import { Journey } from '@dravelopsfrontend/generated-content';

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenToWaldkirchJourney = (): Journey => {
  return {
    id: 'b702393f-d0ce-4bf7-aa37-8560d4fb55a8',
    legs: [
      getGrosshausbergToFurtwangenIlbenstreetLeg(),
      getFurtwangenIlbenstreetToBleibachLeg(),
      getBleibachToWaldkirchKastelberghalleLeg(),
      getWaldkirchKastelberghalleToSickLeg()
    ],
    prices: [
      getRegularPrice()
    ]
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenToWaldkirchJourneyById = (id: string): Journey => {
  return {
    ...getFurtwangenToWaldkirchJourney(),
    id
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getFurtwangenToWaldkirchJourneyByArrivalTime = (arrivalTime: Date): Journey => {
  return {
    ...getFurtwangenToWaldkirchJourney(),
    legs: [
      getGrosshausbergToFurtwangenIlbenstreetLeg(),
      getFurtwangenIlbenstreetToBleibachLeg(),
      getBleibachToWaldkirchKastelberghalleLeg(),
      getWaldkirchKastelberghalleToSickLegByArrivalTime(arrivalTime)
    ]
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getWaldkirchToFurtwangenJourney = (): Journey => {
  return {
    id: 'b791f1ee-d17a-4d9c-8377-e4a944833858',
    legs: [
      getSickToWaldkirchKastelberghalleLeg(),
      getWaldkirchKastelberghalleToBleibachLeg(),
      getBleibachToFurtwangenIlbenstreetLeg(),
      getFurtwangenIlbenstreetToGrosshausbergLeg()
    ],
    prices: [
      getRegularPrice()
    ]
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getWaldkirchToFurtwangenJourneyByDepartureTime = (departureTime: Date): Journey => {
  return {
    ...getWaldkirchToFurtwangenJourney(),
    legs: [
      getSickToWaldkirchKastelberghalleLegByDepartureTime(departureTime),
      getWaldkirchKastelberghalleToBleibachLeg(),
      getBleibachToFurtwangenIlbenstreetLeg(),
      getFurtwangenIlbenstreetToGrosshausbergLeg()
    ]
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getGrosshausbergToFurtwangenIlbenstreetJourney = (arrivalTime?: Date): Journey => {
  return {
    id: 'af69f5f5-88bb-4714-9486-8815ef54ef98',
    legs: [
      getGrosshausbergToFurtwangenIlbenstreetLeg(arrivalTime)
    ],
    prices: [
      getRegularPrice()
    ]
  };
};
