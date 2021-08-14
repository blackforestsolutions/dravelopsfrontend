import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Currency: string;
  Distance: number;
  Duration: number;
  URL: string;
  ZonedDateTime: Date;
}



export enum CompassDirection {
  NORTH = 'NORTH',
  NORTHEAST = 'NORTHEAST',
  EAST = 'EAST',
  SOUTHEAST = 'SOUTHEAST',
  SOUTH = 'SOUTH',
  SOUTHWEST = 'SOUTHWEST',
  WEST = 'WEST',
  NORTHWEST = 'NORTHWEST'
}




export interface Journey {
  __typename?: 'Journey';
  id?: Maybe<Scalars['ID']>;
  legs?: Maybe<Array<Maybe<Leg>>>;
  prices?: Maybe<Array<Maybe<Price>>>;
}

export interface Leg {
  __typename?: 'Leg';
  departure?: Maybe<TravelPoint>;
  arrival?: Maybe<TravelPoint>;
  delayInMinutes?: Maybe<Scalars['Duration']>;
  distanceInKilometers?: Maybe<Scalars['Distance']>;
  vehicleType?: Maybe<VehicleType>;
  waypoints?: Maybe<Array<Maybe<Point>>>;
  travelProvider?: Maybe<TravelProvider>;
  vehicleNumber?: Maybe<Scalars['String']>;
  vehicleName?: Maybe<Scalars['String']>;
  intermediateStops?: Maybe<Array<Maybe<TravelPoint>>>;
  walkSteps?: Maybe<Array<Maybe<WalkStep>>>;
}

export interface Point {
  __typename?: 'Point';
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
}

export interface Polygon {
  __typename?: 'Polygon';
  points?: Maybe<Array<Maybe<Point>>>;
}

export interface Price {
  __typename?: 'Price';
  priceType?: Maybe<PriceType>;
  currencyCode?: Maybe<Scalars['Currency']>;
  smallestCurrencyValue?: Maybe<Scalars['Int']>;
}

export enum PriceType {
  REGULAR = 'Standard',
  STUDENT = 'Studenten',
  SENIOR = 'Senioren',
  TRAM = 'Straßenbahnpreis',
  SPECIAL = 'Angebotspreis',
  YOUTH = 'Kinder'
}

export interface Query {
  __typename?: 'Query';
  /** Language param use ISO 639-1 */
  getJourneysBy?: Maybe<Array<Maybe<Journey>>>;
  /** Language param use ISO 639-1 */
  getAutocompleteAddressesBy?: Maybe<Array<Maybe<TravelPoint>>>;
  getNearestAddressesBy?: Maybe<Array<Maybe<TravelPoint>>>;
  getNearestStationsBy?: Maybe<Array<Maybe<TravelPoint>>>;
  getAllStations?: Maybe<Array<Maybe<TravelPoint>>>;
  getOperatingArea?: Maybe<Polygon>;
}


export interface QueryGetJourneysByArgs {
  departureLongitude: Scalars['Float'];
  departureLatitude: Scalars['Float'];
  arrivalLongitude: Scalars['Float'];
  arrivalLatitude: Scalars['Float'];
  dateTime: Scalars['String'];
  isArrivalDateTime?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
}


export interface QueryGetAutocompleteAddressesByArgs {
  text: Scalars['String'];
  language?: Maybe<Scalars['String']>;
}


export interface QueryGetNearestAddressesByArgs {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  radiusInKilometers?: Maybe<Scalars['Float']>;
  language?: Maybe<Scalars['String']>;
}


export interface QueryGetNearestStationsByArgs {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  radiusInKilometers?: Maybe<Scalars['Float']>;
  language?: Maybe<Scalars['String']>;
}

export interface Subscription {
  __typename?: 'Subscription';
  /** Language param use ISO 639-1 */
  getJourneysBy?: Maybe<Journey>;
}


export interface SubscriptionGetJourneysByArgs {
  departureLongitude: Scalars['Float'];
  departureLatitude: Scalars['Float'];
  arrivalLongitude: Scalars['Float'];
  arrivalLatitude: Scalars['Float'];
  dateTime: Scalars['String'];
  isArrivalDateTime?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
}

export interface TravelPoint {
  __typename?: 'TravelPoint';
  name?: Maybe<Scalars['String']>;
  point?: Maybe<Point>;
  arrivalTime?: Maybe<Scalars['ZonedDateTime']>;
  departureTime?: Maybe<Scalars['ZonedDateTime']>;
  platform?: Maybe<Scalars['String']>;
  distanceInKilometers?: Maybe<Scalars['Distance']>;
}

export interface TravelProvider {
  __typename?: 'TravelProvider';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['URL']>;
}


export enum VehicleType {
  WALK = 'WALK',
  BICYCLE = 'BICYCLE',
  CAR = 'CAR',
  TRAM = 'TRAM',
  SUBWAY = 'SUBWAY',
  RAIL = 'RAIL',
  BUS = 'BUS',
  FERRY = 'FERRY',
  CABLE_CAR = 'CABLE_CAR',
  GONDOLA = 'GONDOLA',
  FUNICULAR = 'FUNICULAR',
  TRANSIT = 'TRANSIT',
  AIRPLANE = 'AIRPLANE'
}

export interface WalkStep {
  __typename?: 'WalkStep';
  streetName?: Maybe<Scalars['String']>;
  distanceInKilometers?: Maybe<Scalars['Distance']>;
  startPoint?: Maybe<Point>;
  endPoint?: Maybe<Point>;
  walkingDirection?: Maybe<WalkingDirection>;
  compassDirection?: Maybe<CompassDirection>;
  isStreetNameGenerated?: Maybe<Scalars['Boolean']>;
  isOriginPoint?: Maybe<Scalars['Boolean']>;
  isDestinationPoint?: Maybe<Scalars['Boolean']>;
  circleExit?: Maybe<Scalars['String']>;
}

export enum WalkingDirection {
  DEPART = 'DEPART',
  HARD_LEFT = 'HARD_LEFT',
  LEFT = 'LEFT',
  SLIGHTLY_LEFT = 'SLIGHTLY_LEFT',
  CONTINUE = 'CONTINUE',
  SLIGHTLY_RIGHT = 'SLIGHTLY_RIGHT',
  RIGHT = 'RIGHT',
  HARD_RIGHT = 'HARD_RIGHT',
  CIRCLE_CLOCKWISE = 'CIRCLE_CLOCKWISE',
  CIRCLE_COUNTERCLOCKWISE = 'CIRCLE_COUNTERCLOCKWISE',
  ELEVATOR = 'ELEVATOR',
  UTURN_LEFT = 'UTURN_LEFT',
  UTURN_RIGHT = 'UTURN_RIGHT'
}


export type JourneyFragment = { __typename?: 'Journey', id?: Maybe<string>, legs?: Maybe<Array<Maybe<{ __typename?: 'Leg', delayInMinutes?: Maybe<number>, distanceInKilometers?: Maybe<number>, vehicleType?: Maybe<VehicleType>, vehicleNumber?: Maybe<string>, vehicleName?: Maybe<string>, departure?: Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>, arrival?: Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>, waypoints?: Maybe<Array<Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>>>, travelProvider?: Maybe<{ __typename?: 'TravelProvider', name?: Maybe<string>, url?: Maybe<string> }>, intermediateStops?: Maybe<Array<Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>>, walkSteps?: Maybe<Array<Maybe<{ __typename?: 'WalkStep', streetName?: Maybe<string>, distanceInKilometers?: Maybe<number>, walkingDirection?: Maybe<WalkingDirection>, compassDirection?: Maybe<CompassDirection>, isStreetNameGenerated?: Maybe<boolean>, isOriginPoint?: Maybe<boolean>, isDestinationPoint?: Maybe<boolean>, circleExit?: Maybe<string>, startPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>, endPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>> }>>>, prices?: Maybe<Array<Maybe<{ __typename?: 'Price', priceType?: Maybe<PriceType>, currencyCode?: Maybe<string>, smallestCurrencyValue?: Maybe<number> }>>> };

export type LegFragment = { __typename?: 'Leg', delayInMinutes?: Maybe<number>, distanceInKilometers?: Maybe<number>, vehicleType?: Maybe<VehicleType>, vehicleNumber?: Maybe<string>, vehicleName?: Maybe<string>, departure?: Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>, arrival?: Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>, waypoints?: Maybe<Array<Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>>>, travelProvider?: Maybe<{ __typename?: 'TravelProvider', name?: Maybe<string>, url?: Maybe<string> }>, intermediateStops?: Maybe<Array<Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>>, walkSteps?: Maybe<Array<Maybe<{ __typename?: 'WalkStep', streetName?: Maybe<string>, distanceInKilometers?: Maybe<number>, walkingDirection?: Maybe<WalkingDirection>, compassDirection?: Maybe<CompassDirection>, isStreetNameGenerated?: Maybe<boolean>, isOriginPoint?: Maybe<boolean>, isDestinationPoint?: Maybe<boolean>, circleExit?: Maybe<string>, startPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>, endPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>> };

export type PriceFragment = { __typename?: 'Price', priceType?: Maybe<PriceType>, currencyCode?: Maybe<string>, smallestCurrencyValue?: Maybe<number> };

export type TravelPointFragment = { __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> };

export type TravelProviderFragment = { __typename?: 'TravelProvider', name?: Maybe<string>, url?: Maybe<string> };

export type WalkStepFragment = { __typename?: 'WalkStep', streetName?: Maybe<string>, distanceInKilometers?: Maybe<number>, walkingDirection?: Maybe<WalkingDirection>, compassDirection?: Maybe<CompassDirection>, isStreetNameGenerated?: Maybe<boolean>, isOriginPoint?: Maybe<boolean>, isDestinationPoint?: Maybe<boolean>, circleExit?: Maybe<string>, startPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>, endPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> };

export type AutocompleteAddressFragment = { __typename?: 'TravelPoint', name?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> };

export type NearestTravelPointFragment = { __typename?: 'TravelPoint', name?: Maybe<string>, distanceInKilometers?: Maybe<number>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> };

export type PolygonFragment = { __typename?: 'Polygon', points?: Maybe<Array<Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>>> };

export type PointFragment = { __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> };

export type GetAllJourneysQueryVariables = Exact<{
  departureLatitude: Scalars['Float'];
  departureLongitude: Scalars['Float'];
  arrivalLatitude: Scalars['Float'];
  arrivalLongitude: Scalars['Float'];
  dateTime: Scalars['String'];
  isArrivalDateTime: Scalars['Boolean'];
}>;


export type GetAllJourneysQuery = { __typename?: 'Query', getJourneysBy?: Maybe<Array<Maybe<{ __typename?: 'Journey', id?: Maybe<string>, legs?: Maybe<Array<Maybe<{ __typename?: 'Leg', delayInMinutes?: Maybe<number>, distanceInKilometers?: Maybe<number>, vehicleType?: Maybe<VehicleType>, vehicleNumber?: Maybe<string>, vehicleName?: Maybe<string>, departure?: Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>, arrival?: Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>, waypoints?: Maybe<Array<Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>>>, travelProvider?: Maybe<{ __typename?: 'TravelProvider', name?: Maybe<string>, url?: Maybe<string> }>, intermediateStops?: Maybe<Array<Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>>, walkSteps?: Maybe<Array<Maybe<{ __typename?: 'WalkStep', streetName?: Maybe<string>, distanceInKilometers?: Maybe<number>, walkingDirection?: Maybe<WalkingDirection>, compassDirection?: Maybe<CompassDirection>, isStreetNameGenerated?: Maybe<boolean>, isOriginPoint?: Maybe<boolean>, isDestinationPoint?: Maybe<boolean>, circleExit?: Maybe<string>, startPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>, endPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>> }>>>, prices?: Maybe<Array<Maybe<{ __typename?: 'Price', priceType?: Maybe<PriceType>, currencyCode?: Maybe<string>, smallestCurrencyValue?: Maybe<number> }>>> }>>> };

export type GetJourneysSubscriptionVariables = Exact<{
  departureLatitude: Scalars['Float'];
  departureLongitude: Scalars['Float'];
  arrivalLatitude: Scalars['Float'];
  arrivalLongitude: Scalars['Float'];
  dateTime: Scalars['String'];
  isArrivalDateTime: Scalars['Boolean'];
}>;


export type GetJourneysSubscription = { __typename?: 'Subscription', getJourneysBy?: Maybe<{ __typename?: 'Journey', id?: Maybe<string>, legs?: Maybe<Array<Maybe<{ __typename?: 'Leg', delayInMinutes?: Maybe<number>, distanceInKilometers?: Maybe<number>, vehicleType?: Maybe<VehicleType>, vehicleNumber?: Maybe<string>, vehicleName?: Maybe<string>, departure?: Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>, arrival?: Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>, waypoints?: Maybe<Array<Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>>>, travelProvider?: Maybe<{ __typename?: 'TravelProvider', name?: Maybe<string>, url?: Maybe<string> }>, intermediateStops?: Maybe<Array<Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, arrivalTime?: Maybe<Date>, departureTime?: Maybe<Date>, platform?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>>, walkSteps?: Maybe<Array<Maybe<{ __typename?: 'WalkStep', streetName?: Maybe<string>, distanceInKilometers?: Maybe<number>, walkingDirection?: Maybe<WalkingDirection>, compassDirection?: Maybe<CompassDirection>, isStreetNameGenerated?: Maybe<boolean>, isOriginPoint?: Maybe<boolean>, isDestinationPoint?: Maybe<boolean>, circleExit?: Maybe<string>, startPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>, endPoint?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>> }>>>, prices?: Maybe<Array<Maybe<{ __typename?: 'Price', priceType?: Maybe<PriceType>, currencyCode?: Maybe<string>, smallestCurrencyValue?: Maybe<number> }>>> }> };

export type GetNearestAddressesQueryVariables = Exact<{
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  radiusInKilometers?: Maybe<Scalars['Float']>;
}>;


export type GetNearestAddressesQuery = { __typename?: 'Query', getNearestAddressesBy?: Maybe<Array<Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, distanceInKilometers?: Maybe<number>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>> };

export type GetNearestStationsQueryVariables = Exact<{
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  radiusInKilometers?: Maybe<Scalars['Float']>;
}>;


export type GetNearestStationsQuery = { __typename?: 'Query', getNearestStationsBy?: Maybe<Array<Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, distanceInKilometers?: Maybe<number>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>> };

export type GetOperatingAreaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOperatingAreaQuery = { __typename?: 'Query', getOperatingArea?: Maybe<{ __typename?: 'Polygon', points?: Maybe<Array<Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }>>> }> };

export type GetAddressesQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type GetAddressesQuery = { __typename?: 'Query', getAutocompleteAddressesBy?: Maybe<Array<Maybe<{ __typename?: 'TravelPoint', name?: Maybe<string>, point?: Maybe<{ __typename?: 'Point', x?: Maybe<number>, y?: Maybe<number> }> }>>> };

export const PointFragmentDoc = gql`
    fragment point on Point {
  x
  y
}
    `;
export const TravelPointFragmentDoc = gql`
    fragment travelPoint on TravelPoint {
  name
  point {
    ...point
  }
  arrivalTime
  departureTime
  platform
}
    ${PointFragmentDoc}`;
export const TravelProviderFragmentDoc = gql`
    fragment travelProvider on TravelProvider {
  name
  url
}
    `;
export const WalkStepFragmentDoc = gql`
    fragment walkStep on WalkStep {
  streetName
  distanceInKilometers
  startPoint {
    ...point
  }
  endPoint {
    ...point
  }
  walkingDirection
  compassDirection
  isStreetNameGenerated
  isOriginPoint
  isDestinationPoint
  circleExit
}
    ${PointFragmentDoc}`;
export const LegFragmentDoc = gql`
    fragment leg on Leg {
  departure {
    ...travelPoint
  }
  arrival {
    ...travelPoint
  }
  delayInMinutes
  distanceInKilometers
  vehicleType
  waypoints {
    ...point
  }
  travelProvider {
    ...travelProvider
  }
  vehicleNumber
  vehicleName
  intermediateStops {
    ...travelPoint
  }
  walkSteps {
    ...walkStep
  }
}
    ${TravelPointFragmentDoc}
${PointFragmentDoc}
${TravelProviderFragmentDoc}
${WalkStepFragmentDoc}`;
export const PriceFragmentDoc = gql`
    fragment price on Price {
  priceType
  currencyCode
  smallestCurrencyValue
}
    `;
export const JourneyFragmentDoc = gql`
    fragment journey on Journey {
  id
  legs {
    ...leg
  }
  prices {
    ...price
  }
}
    ${LegFragmentDoc}
${PriceFragmentDoc}`;
export const AutocompleteAddressFragmentDoc = gql`
    fragment autocompleteAddress on TravelPoint {
  name
  point {
    ...point
  }
}
    ${PointFragmentDoc}`;
export const NearestTravelPointFragmentDoc = gql`
    fragment nearestTravelPoint on TravelPoint {
  name
  point {
    ...point
  }
  distanceInKilometers
}
    ${PointFragmentDoc}`;
export const PolygonFragmentDoc = gql`
    fragment polygon on Polygon {
  points {
    ...point
  }
}
    ${PointFragmentDoc}`;
export const GetAllJourneysDocument = gql`
    query GetAllJourneys($departureLatitude: Float!, $departureLongitude: Float!, $arrivalLatitude: Float!, $arrivalLongitude: Float!, $dateTime: String!, $isArrivalDateTime: Boolean!) {
  getJourneysBy(
    departureLatitude: $departureLatitude
    departureLongitude: $departureLongitude
    arrivalLatitude: $arrivalLatitude
    arrivalLongitude: $arrivalLongitude
    dateTime: $dateTime
    isArrivalDateTime: $isArrivalDateTime
  ) {
    ...journey
  }
}
    ${JourneyFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllJourneysGQL extends Apollo.Query<GetAllJourneysQuery, GetAllJourneysQueryVariables> {
    document = GetAllJourneysDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetJourneysDocument = gql`
    subscription GetJourneys($departureLatitude: Float!, $departureLongitude: Float!, $arrivalLatitude: Float!, $arrivalLongitude: Float!, $dateTime: String!, $isArrivalDateTime: Boolean!) {
  getJourneysBy(
    departureLatitude: $departureLatitude
    departureLongitude: $departureLongitude
    arrivalLatitude: $arrivalLatitude
    arrivalLongitude: $arrivalLongitude
    dateTime: $dateTime
    isArrivalDateTime: $isArrivalDateTime
  ) {
    ...journey
  }
}
    ${JourneyFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetJourneysGQL extends Apollo.Subscription<GetJourneysSubscription, GetJourneysSubscriptionVariables> {
    document = GetJourneysDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetNearestAddressesDocument = gql`
    query GetNearestAddresses($longitude: Float!, $latitude: Float!, $radiusInKilometers: Float) {
  getNearestAddressesBy(
    longitude: $longitude
    latitude: $latitude
    radiusInKilometers: $radiusInKilometers
  ) {
    ...nearestTravelPoint
  }
}
    ${NearestTravelPointFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetNearestAddressesGQL extends Apollo.Query<GetNearestAddressesQuery, GetNearestAddressesQueryVariables> {
    document = GetNearestAddressesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetNearestStationsDocument = gql`
    query GetNearestStations($longitude: Float!, $latitude: Float!, $radiusInKilometers: Float) {
  getNearestStationsBy(
    longitude: $longitude
    latitude: $latitude
    radiusInKilometers: $radiusInKilometers
  ) {
    ...nearestTravelPoint
  }
}
    ${NearestTravelPointFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetNearestStationsGQL extends Apollo.Query<GetNearestStationsQuery, GetNearestStationsQueryVariables> {
    document = GetNearestStationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetOperatingAreaDocument = gql`
    query GetOperatingArea {
  getOperatingArea {
    ...polygon
  }
}
    ${PolygonFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOperatingAreaGQL extends Apollo.Query<GetOperatingAreaQuery, GetOperatingAreaQueryVariables> {
    document = GetOperatingAreaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAddressesDocument = gql`
    query GetAddresses($text: String!) {
  getAutocompleteAddressesBy(text: $text) {
    ...autocompleteAddress
  }
}
    ${AutocompleteAddressFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAddressesGQL extends Apollo.Query<GetAddressesQuery, GetAddressesQueryVariables> {
    document = GetAddressesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }