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


export type JourneyFragment = (
  { __typename?: 'Journey' }
  & Pick<Journey, 'id'>
  & { legs?: Maybe<Array<Maybe<(
    { __typename?: 'Leg' }
    & LegFragment
  )>>>, prices?: Maybe<Array<Maybe<(
    { __typename?: 'Price' }
    & PriceFragment
  )>>> }
);

export type LegFragment = (
  { __typename?: 'Leg' }
  & Pick<Leg, 'delayInMinutes' | 'distanceInKilometers' | 'vehicleType' | 'vehicleNumber' | 'vehicleName'>
  & { departure?: Maybe<(
    { __typename?: 'TravelPoint' }
    & TravelPointFragment
  )>, arrival?: Maybe<(
    { __typename?: 'TravelPoint' }
    & TravelPointFragment
  )>, waypoints?: Maybe<Array<Maybe<(
    { __typename?: 'Point' }
    & PointFragment
  )>>>, travelProvider?: Maybe<(
    { __typename?: 'TravelProvider' }
    & TravelProviderFragment
  )>, intermediateStops?: Maybe<Array<Maybe<(
    { __typename?: 'TravelPoint' }
    & TravelPointFragment
  )>>> }
);

export type PriceFragment = (
  { __typename?: 'Price' }
  & Pick<Price, 'priceType' | 'currencyCode' | 'smallestCurrencyValue'>
);

export type TravelPointFragment = (
  { __typename?: 'TravelPoint' }
  & Pick<TravelPoint, 'name' | 'arrivalTime' | 'departureTime' | 'platform'>
  & { point?: Maybe<(
    { __typename?: 'Point' }
    & PointFragment
  )> }
);

export type TravelProviderFragment = (
  { __typename?: 'TravelProvider' }
  & Pick<TravelProvider, 'name' | 'url'>
);

export type AutocompleteAddressFragment = (
  { __typename?: 'TravelPoint' }
  & Pick<TravelPoint, 'name'>
  & { point?: Maybe<(
    { __typename?: 'Point' }
    & PointFragment
  )> }
);

export type NearestTravelPointFragment = (
  { __typename?: 'TravelPoint' }
  & Pick<TravelPoint, 'name' | 'distanceInKilometers'>
  & { point?: Maybe<(
    { __typename?: 'Point' }
    & PointFragment
  )> }
);

export type PolygonFragment = (
  { __typename?: 'Polygon' }
  & { points?: Maybe<Array<Maybe<(
    { __typename?: 'Point' }
    & PointFragment
  )>>> }
);

export type PointFragment = (
  { __typename?: 'Point' }
  & Pick<Point, 'x' | 'y'>
);

export type GetAllJourneysQueryVariables = Exact<{
  departureLatitude: Scalars['Float'];
  departureLongitude: Scalars['Float'];
  arrivalLatitude: Scalars['Float'];
  arrivalLongitude: Scalars['Float'];
  dateTime: Scalars['String'];
  isArrivalDateTime: Scalars['Boolean'];
}>;


export type GetAllJourneysQuery = (
  { __typename?: 'Query' }
  & { getJourneysBy?: Maybe<Array<Maybe<(
    { __typename?: 'Journey' }
    & JourneyFragment
  )>>> }
);

export type GetJourneysSubscriptionVariables = Exact<{
  departureLatitude: Scalars['Float'];
  departureLongitude: Scalars['Float'];
  arrivalLatitude: Scalars['Float'];
  arrivalLongitude: Scalars['Float'];
  dateTime: Scalars['String'];
  isArrivalDateTime: Scalars['Boolean'];
}>;


export type GetJourneysSubscription = (
  { __typename?: 'Subscription' }
  & { getJourneysBy?: Maybe<(
    { __typename?: 'Journey' }
    & JourneyFragment
  )> }
);

export type GetNearestAddressesQueryVariables = Exact<{
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  radiusInKilometers?: Maybe<Scalars['Float']>;
}>;


export type GetNearestAddressesQuery = (
  { __typename?: 'Query' }
  & { getNearestAddressesBy?: Maybe<Array<Maybe<(
    { __typename?: 'TravelPoint' }
    & NearestTravelPointFragment
  )>>> }
);

export type GetNearestStationsQueryVariables = Exact<{
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  radiusInKilometers?: Maybe<Scalars['Float']>;
  language?: Maybe<Scalars['String']>;
}>;


export type GetNearestStationsQuery = (
  { __typename?: 'Query' }
  & { getNearestStationsBy?: Maybe<Array<Maybe<(
    { __typename?: 'TravelPoint' }
    & NearestTravelPointFragment
  )>>> }
);

export type GetOperatingAreaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOperatingAreaQuery = (
  { __typename?: 'Query' }
  & { getOperatingArea?: Maybe<(
    { __typename?: 'Polygon' }
    & PolygonFragment
  )> }
);

export type GetAddressesQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type GetAddressesQuery = (
  { __typename?: 'Query' }
  & { getAutocompleteAddressesBy?: Maybe<Array<Maybe<(
    { __typename?: 'TravelPoint' }
    & AutocompleteAddressFragment
  )>>> }
);

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
}
    ${TravelPointFragmentDoc}
${PointFragmentDoc}
${TravelProviderFragmentDoc}`;
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
    query GetNearestStations($longitude: Float!, $latitude: Float!, $radiusInKilometers: Float, $language: String) {
  getNearestStationsBy(
    longitude: $longitude
    latitude: $latitude
    radiusInKilometers: $radiusInKilometers
    language: $language
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