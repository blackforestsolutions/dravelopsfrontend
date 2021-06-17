import { Injectable } from '@angular/core';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { GetAllJourneysQuery, GetJourneysSubscription, JourneyFragment } from '@dravelopsfrontend/generated-content';
import { map, mergeAll, tap } from 'rxjs/operators';
import { JourneyApiService } from '../../shared/api/journey-api.service';
import { ApolloQueryResult, SubscriptionResult } from '@apollo/client';
import { ApiToken, Point, TravelTime } from '../../shared/model/api-token';
import { ParamMap } from '@angular/router';
import { FilterEqualJourneysPipe } from '../pipes/filter-equal-journey-pipe/filter-equal-journeys.pipe';
import { SortJourneyPipe } from '../pipes/sort-journey-pipe/sort-journey.pipe';

type Loading = (loading: boolean) => void;

@Injectable()
export class JourneyListService {

  constructor(
    private readonly journeyApiService: JourneyApiService,
    private readonly filterEqualJourneyPipe: FilterEqualJourneysPipe,
    private readonly sortJourneysPipe: SortJourneyPipe
  ) {
  }

  public getOutwardJourneysBy(params: ParamMap, setLoading: Loading): Observable<JourneyFragment | JourneyFragment[]> {
    const apiToken: ApiToken = this.buildOutwardJourneyApiTokenWith(params);
    return this.getJourneys(apiToken, setLoading);
  }

  public getBackwardJourneysBy(params: ParamMap, setLoading: Loading): Observable<JourneyFragment | JourneyFragment[]> {
    const apiToken: ApiToken = this.buildBackwardJourneyApiTokenWith(params);
    return this.getJourneys(apiToken, setLoading);
  }

  // not possible to make method signature shorter
  // eslint-disable-next-line max-len
  public getEarlierJourneysBy(params: ParamMap, setLoading: Loading, currentJourneys: JourneyFragment[]): Observable<JourneyFragment | JourneyFragment[]> {
    const filteredJourneys: JourneyFragment[] = this.filterEqualJourneyPipe.transform(currentJourneys);
    const sortedJourneys: JourneyFragment[] = this.sortJourneysPipe.transform(filteredJourneys, false);
    const earliestJourney: JourneyFragment = sortedJourneys[0];
    const apiToken: ApiToken = this.buildEarlierJourneyApiTokenWith(params, earliestJourney);

    return this.getJourneys(apiToken, setLoading);
  }

  // not possible to make method signature shorter
  // eslint-disable-next-line max-len
  public getLaterJourneysBy(params: ParamMap, setLoading: Loading, currentJourneys: JourneyFragment[]): Observable<JourneyFragment | JourneyFragment[]> {
    const filteredJourneys: JourneyFragment[] = this.filterEqualJourneyPipe.transform(currentJourneys);
    const sortedJourneys: JourneyFragment[] = this.sortJourneysPipe.transform(filteredJourneys, false);
    const latestJourney: JourneyFragment = sortedJourneys[sortedJourneys.length - 1];
    const apiToken: ApiToken = this.buildLaterJourneyApiTokenWith(params, latestJourney);

    return this.getJourneys(apiToken, setLoading);
  }

  public getJourneys(apiToken: ApiToken, setLoading: Loading): Observable<JourneyFragment | JourneyFragment[]> {
    setLoading(true);
    return scheduled([
      this.getJourneysBy(apiToken),
      this.getAllJourneysBy(apiToken, setLoading)
    ], asyncScheduler).pipe(
      mergeAll()
    );
  }

  private getAllJourneysBy(apiToken: ApiToken, setLoading: Loading): Observable<JourneyFragment[]> {
    return this.journeyApiService.getAllJourneysBy(apiToken).pipe(
      tap((result: ApolloQueryResult<GetAllJourneysQuery>) => setLoading(result.loading)),
      map((result: ApolloQueryResult<GetAllJourneysQuery>) => result.data.getJourneysBy)
    );
  }

  private getJourneysBy(apiToken: ApiToken): Observable<JourneyFragment> {
    return this.journeyApiService.getJourneysBy(apiToken).pipe(
      map((result: SubscriptionResult<GetJourneysSubscription>) => result.data.getJourneysBy)
    );
  }

  private buildOutwardJourneyApiTokenWith(params: ParamMap): ApiToken {
    const departureCoordinate: Point = this.buildDepartureCoordinateWith(params);
    const arrivalCoordinate: Point = this.buildArrivalCoordinateWith(params);
    const outwardJourney: TravelTime = this.buildOutwardJourneyTravelTimeWith(params);

    return {
      departureCoordinate,
      arrivalCoordinate,
      outwardJourney
    };
  }

  private buildBackwardJourneyApiTokenWith(params: ParamMap): ApiToken {
    const departureCoordinate: Point = this.buildArrivalCoordinateWith(params);
    const arrivalCoordinate: Point = this.buildDepartureCoordinateWith(params);
    const outwardJourney: TravelTime = this.buildBackwardJourneyTravelTimeWith(params);

    return {
      departureCoordinate,
      arrivalCoordinate,
      outwardJourney
    };
  }

  private buildEarlierJourneyApiTokenWith(params: ParamMap, earliestJourney: JourneyFragment): ApiToken {
    const apiToken: ApiToken = this.buildOutwardJourneyApiTokenWith(params);

    apiToken.outwardJourney.dateTime = earliestJourney.legs[0].departure.departureTime;
    apiToken.outwardJourney.isArrivalDateTime = true;

    return apiToken;
  }

  private buildLaterJourneyApiTokenWith(params: ParamMap, latestJourney: JourneyFragment): ApiToken {
    const apiToken: ApiToken = this.buildOutwardJourneyApiTokenWith(params);

    apiToken.outwardJourney.dateTime = latestJourney.legs[latestJourney.legs.length - 1].arrival.arrivalTime;
    apiToken.outwardJourney.isArrivalDateTime = false;

    return apiToken;
  }

  private buildDepartureCoordinateWith(params: ParamMap): Point {
    const longitude: number = +params.get('departureLongitude');
    const latitude: number = +params.get('departureLatitude');

    return {
      longitude,
      latitude
    };
  }

  private buildArrivalCoordinateWith(params: ParamMap): Point {
    const longitude: number = +params.get('arrivalLongitude');
    const latitude: number = +params.get('arrivalLatitude');

    return {
      longitude,
      latitude
    };
  }

  private buildOutwardJourneyTravelTimeWith(params: ParamMap): TravelTime {
    const dateTime: Date = new Date(+params.get('outwardJourneyDateTime'));
    const isArrivalDateTime: boolean = JSON.parse(params.get('outwardJourneyIsArrivalDateTime'));

    return {
      dateTime,
      isArrivalDateTime
    };
  }

  private buildBackwardJourneyTravelTimeWith(params: ParamMap): TravelTime {
    const dateTime: Date = new Date(+params.get('backwardJourneyDateTime'));
    const isArrivalDateTime: boolean = JSON.parse(params.get('backwardJourneyIsArrivalDateTime'));

    return {
      dateTime,
      isArrivalDateTime
    };
  }
}
