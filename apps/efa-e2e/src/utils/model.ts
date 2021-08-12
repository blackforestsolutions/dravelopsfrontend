/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export interface CypressApiToken {
  isRoundTrip?: boolean;
  departure?: string;
  arrival?: string;
  outwardJourney?: CypressTravelTime;
  backwardJourney?: CypressTravelTime;
}

/**
 * NEVER USE IN PRODUCTIVE CODE!
 * ONLY FOR TESTING!
 */
export interface CypressTravelTime {
  dateTime?: Date,
  isArrivalDateTime?: boolean;
}
