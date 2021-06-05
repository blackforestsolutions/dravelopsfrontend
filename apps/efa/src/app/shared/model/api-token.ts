export interface ApiToken {
  isRoundTrip?: boolean;
  departureCoordinate: Point;
  arrivalCoordinate: Point;
  outwardJourney: TravelTime,
  backwardJourney?: TravelTime
}

export interface TravelTime {
  dateTime: Date,
  isArrivalDateTime: boolean;
}

export interface Point {
  longitude: number,
  latitude: number
}
