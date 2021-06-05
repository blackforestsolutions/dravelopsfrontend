import * as os from 'os';
import { ApiToken } from '../model/api-token';
import { GetAllJourneysQueryVariables } from '../model/generated';

const DEFAULT_TEST_IS_ROUND_TRIP = true;
const DEFAULT_TEST_IS_NO_ROUND_TRIP = false;
const DEFAULT_TEST_DEPARTURE_NAME = 'Am Großhausberg 8';
const DEFAULT_TEST_DEPARTURE_LONGITUDE = 8.209972;
const DEFAULT_TEST_DEPARTURE_LATITUDE = 48.04832;
const DEFAULT_TEST_ARRIVAL_NAME = 'Sick AG';
const DEFAULT_TEST_ARRIVAL_LONGITUDE = 7.950507;
const DEFAULT_TEST_ARRIVAL_LATITUDE = 48.088204;
const DEFAULT_TEST_OUTWARD_JOURNEY_DATE: Date = new Date('2020-09-30T12:30:30+02:00');
const DEFAULT_TEST_OUTWARD_JOURNEY_TIME: Date = new Date('2020-09-30T13:00:00+02:00');
const DEFAULT_TEST_OUTWARD_JOURNEY_DATE_TIME: Date = new Date('2020-09-30T13:00:00+02:00');
const DEFAULT_TEST_BACKWARD_JOURNEY_DATE: Date = new Date('2020-10-01T12:30:30+02:00');
const DEFAULT_TEST_BACKWARD_JOURNEY_TIME: Date = new Date('2020-10-01T13:00:00+02:00');
const DEFAULT_TEST_BACKWARD_JOURNEY_DATE_TIME: Date = new Date('2020-10-01T13:00:00+02:00');
const DEFAULT_TEST_IS_ARRIVAL_DATE_TIME = true;
const DEFAULT_TEST_IS_NO_ARRIVAL_DATE_TIME = false;

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenWithIsRoundTripAsTrue = (): ApiToken => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_ROUND_TRIP,
    departureCoordinate: {
      longitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
      latitude: DEFAULT_TEST_DEPARTURE_LATITUDE
    },
    arrivalCoordinate: {
      longitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
      latitude: DEFAULT_TEST_ARRIVAL_LATITUDE
    },
    outwardJourney: {
      dateTime: DEFAULT_TEST_OUTWARD_JOURNEY_DATE_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    },
    backwardJourney: {
      dateTime: DEFAULT_TEST_BACKWARD_JOURNEY_DATE_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    }
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenWithIsRoundTripAsFalse = (): ApiToken => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_NO_ROUND_TRIP,
    departureCoordinate: {
      longitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
      latitude: DEFAULT_TEST_DEPARTURE_LATITUDE
    },
    arrivalCoordinate: {
      longitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
      latitude: DEFAULT_TEST_ARRIVAL_LATITUDE
    },
    outwardJourney: {
      dateTime: DEFAULT_TEST_OUTWARD_JOURNEY_DATE_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    }
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenWithIsArrivalDateTimeAsFalse = (): ApiToken => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_ROUND_TRIP,
    departureCoordinate: {
      longitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
      latitude: DEFAULT_TEST_DEPARTURE_LATITUDE
    },
    arrivalCoordinate: {
      longitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
      latitude: DEFAULT_TEST_ARRIVAL_LATITUDE
    },
    outwardJourney: {
      dateTime: DEFAULT_TEST_OUTWARD_JOURNEY_DATE_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_NO_ARRIVAL_DATE_TIME
    },
    backwardJourney: {
      dateTime: DEFAULT_TEST_BACKWARD_JOURNEY_DATE_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_NO_ARRIVAL_DATE_TIME
    }
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getOutwardJourneyApiToken = (): ApiToken => {
  return {
    departureCoordinate: {
      longitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
      latitude: DEFAULT_TEST_DEPARTURE_LATITUDE
    },
    arrivalCoordinate: {
      longitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
      latitude: DEFAULT_TEST_ARRIVAL_LATITUDE
    },
    outwardJourney: {
      dateTime: DEFAULT_TEST_OUTWARD_JOURNEY_DATE_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    }
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getBackwardJourneyApiToken = (): ApiToken => {
  return {
    departureCoordinate: {
      longitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
      latitude: DEFAULT_TEST_ARRIVAL_LATITUDE
    },
    arrivalCoordinate: {
      longitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
      latitude: DEFAULT_TEST_DEPARTURE_LATITUDE
    },
    outwardJourney: {
      dateTime: DEFAULT_TEST_BACKWARD_JOURNEY_DATE_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    }
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getAllJourneysQueryVariablesWithNoEmptyField = (): GetAllJourneysQueryVariables => {
  return {
    departureLatitude: DEFAULT_TEST_DEPARTURE_LATITUDE,
    departureLongitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
    arrivalLatitude: DEFAULT_TEST_ARRIVAL_LATITUDE,
    arrivalLongitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
    dateTime: getDateTimeByOperatingSystem(),
    isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
  };
};

const getDateTimeByOperatingSystem = (): string => {
  if (os.platform() === 'linux') {
    return '2020-09-30T11:00:00Z';
  }
  return '2020-09-30T13:00:00+02:00';
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenFormWithIsRoundTripAsTrue = (): unknown => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_ROUND_TRIP,
    departureTravelPoint: {
      name: DEFAULT_TEST_DEPARTURE_NAME,
      point: {
        x: DEFAULT_TEST_DEPARTURE_LONGITUDE,
        y: DEFAULT_TEST_DEPARTURE_LATITUDE
      }
    },
    arrivalTravelPoint: {
      name: DEFAULT_TEST_ARRIVAL_NAME,
      point: {
        x: DEFAULT_TEST_ARRIVAL_LONGITUDE,
        y: DEFAULT_TEST_ARRIVAL_LATITUDE
      }
    },
    outwardJourney: {
      date: DEFAULT_TEST_OUTWARD_JOURNEY_DATE,
      time: DEFAULT_TEST_OUTWARD_JOURNEY_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    },
    backwardJourney: {
      date: DEFAULT_TEST_BACKWARD_JOURNEY_DATE,
      time: DEFAULT_TEST_BACKWARD_JOURNEY_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    }
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenFormWithIsRoundTripAsFalse = (): unknown => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_NO_ROUND_TRIP,
    departureTravelPoint: {
      name: DEFAULT_TEST_DEPARTURE_NAME,
      point: {
        x: DEFAULT_TEST_DEPARTURE_LONGITUDE,
        y: DEFAULT_TEST_DEPARTURE_LATITUDE
      }
    },
    arrivalTravelPoint: {
      name: DEFAULT_TEST_ARRIVAL_NAME,
      point: {
        x: DEFAULT_TEST_ARRIVAL_LONGITUDE,
        y: DEFAULT_TEST_ARRIVAL_LATITUDE
      }
    },
    outwardJourney: {
      date: DEFAULT_TEST_OUTWARD_JOURNEY_DATE,
      time: DEFAULT_TEST_OUTWARD_JOURNEY_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    },
    backwardJourney: {
      date: null,
      time: null,
      isArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
    }
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenFormWithIsArrivalDateTimeAsFalse = (): unknown => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_ROUND_TRIP,
    departureTravelPoint: {
      name: DEFAULT_TEST_DEPARTURE_NAME,
      point: {
        x: DEFAULT_TEST_DEPARTURE_LONGITUDE,
        y: DEFAULT_TEST_DEPARTURE_LATITUDE
      }
    },
    arrivalTravelPoint: {
      name: DEFAULT_TEST_ARRIVAL_NAME,
      point: {
        x: DEFAULT_TEST_ARRIVAL_LONGITUDE,
        y: DEFAULT_TEST_ARRIVAL_LATITUDE
      }
    },
    outwardJourney: {
      date: DEFAULT_TEST_OUTWARD_JOURNEY_DATE,
      time: DEFAULT_TEST_OUTWARD_JOURNEY_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_NO_ARRIVAL_DATE_TIME
    },
    backwardJourney: {
      date: DEFAULT_TEST_BACKWARD_JOURNEY_DATE,
      time: DEFAULT_TEST_BACKWARD_JOURNEY_TIME,
      isArrivalDateTime: DEFAULT_TEST_IS_NO_ARRIVAL_DATE_TIME
    }
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenParamMapWithIsRoundTripAsTrue = (): unknown => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_ROUND_TRIP,
    departureLatitude: DEFAULT_TEST_DEPARTURE_LATITUDE,
    departureLongitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
    arrivalLatitude: DEFAULT_TEST_ARRIVAL_LATITUDE,
    arrivalLongitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
    outwardJourneyDateTime: DEFAULT_TEST_OUTWARD_JOURNEY_DATE_TIME,
    outwardJourneyIsArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME,
    backwardJourneyDateTime: DEFAULT_TEST_BACKWARD_JOURNEY_DATE_TIME,
    backwardJourneyIsArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenParamMapWithIsRoundTripAsFalse = (): unknown => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_NO_ROUND_TRIP,
    departureLatitude: DEFAULT_TEST_DEPARTURE_LATITUDE,
    departureLongitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
    arrivalLatitude: DEFAULT_TEST_ARRIVAL_LATITUDE,
    arrivalLongitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
    outwardJourneyDateTime: DEFAULT_TEST_OUTWARD_JOURNEY_DATE_TIME,
    outwardJourneyIsArrivalDateTime: DEFAULT_TEST_IS_ARRIVAL_DATE_TIME
  };
};

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export const getApiTokenParamMapWithIsArrivalDateTimeAsFalse = (): unknown => {
  return {
    isRoundTrip: DEFAULT_TEST_IS_ROUND_TRIP,
    departureLatitude: DEFAULT_TEST_DEPARTURE_LATITUDE,
    departureLongitude: DEFAULT_TEST_DEPARTURE_LONGITUDE,
    arrivalLatitude: DEFAULT_TEST_ARRIVAL_LATITUDE,
    arrivalLongitude: DEFAULT_TEST_ARRIVAL_LONGITUDE,
    outwardJourneyDateTime: DEFAULT_TEST_OUTWARD_JOURNEY_DATE_TIME,
    outwardJourneyIsArrivalDateTime: DEFAULT_TEST_IS_NO_ARRIVAL_DATE_TIME,
    backwardJourneyDateTime: DEFAULT_TEST_BACKWARD_JOURNEY_DATE_TIME,
    backwardJourneyIsArrivalDateTime: DEFAULT_TEST_IS_NO_ARRIVAL_DATE_TIME
  };
};


