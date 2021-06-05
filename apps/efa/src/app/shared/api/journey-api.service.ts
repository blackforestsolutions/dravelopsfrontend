import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { SubscriptionResult } from 'apollo-angular';
import { GetAllJourneysGQL, GetAllJourneysQuery, GetJourneysGQL, GetJourneysSubscription } from '../model/generated';
import { ApolloQueryResult } from '@apollo/client';
import { ApiToken } from '../model/api-token';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class JourneyApiService {

  constructor(
    private readonly getAllJourneysGQL: GetAllJourneysGQL,
    private readonly getJourneysGQL: GetJourneysGQL,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
  }

  getJourneysBy(apiToken: ApiToken): Observable<SubscriptionResult<GetJourneysSubscription>> {
    const datePipe: DatePipe = new DatePipe(this.locale);
    return this.getJourneysGQL.subscribe({
      departureLatitude: apiToken.departureCoordinate.latitude,
      departureLongitude: apiToken.departureCoordinate.longitude,
      arrivalLatitude: apiToken.arrivalCoordinate.latitude,
      arrivalLongitude: apiToken.arrivalCoordinate.longitude,
      dateTime: datePipe.transform(apiToken.outwardJourney.dateTime, 'yyyy-MM-ddTHH:mm:ssZZZZZ'),
      isArrivalDateTime: apiToken.outwardJourney.isArrivalDateTime
    })
      .pipe(
        retry(3)
      );
  }

  getAllJourneysBy(apiToken: ApiToken): Observable<ApolloQueryResult<GetAllJourneysQuery>> {
    const datePipe: DatePipe = new DatePipe(this.locale);
    return this.getAllJourneysGQL.watch({
      departureLatitude: apiToken.departureCoordinate.latitude,
      departureLongitude: apiToken.departureCoordinate.longitude,
      arrivalLatitude: apiToken.arrivalCoordinate.latitude,
      arrivalLongitude: apiToken.arrivalCoordinate.longitude,
      dateTime: datePipe.transform(apiToken.outwardJourney.dateTime, 'yyyy-MM-ddTHH:mm:ssZZZZZ'),
      isArrivalDateTime: apiToken.outwardJourney.isArrivalDateTime
    })
      .valueChanges
      .pipe(
        retry(3)
      );
  }
}
