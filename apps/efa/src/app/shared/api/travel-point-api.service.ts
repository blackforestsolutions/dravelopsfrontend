import { Inject, Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client';
import { RADIUS_IN_KILOMETERS } from '../../../environments/config-tokens';
import {
  AutocompleteAddressFragment,
  GetAddressesGQL,
  GetAddressesQuery,
  GetNearestAddressesGQL,
  GetNearestAddressesQuery,
  GetNearestStationsGQL,
  GetNearestStationsQuery,
  NearestTravelPointFragment
} from '@dravelopsfrontend/generated-content';

@Injectable({
  providedIn: 'root'
})
export class TravelPointApiService {

  constructor(
    @Inject(RADIUS_IN_KILOMETERS) private readonly radiusInKilometers: number,
    private readonly getAddressesGQL: GetAddressesGQL,
    private readonly getNearestAddressesGQL: GetNearestAddressesGQL,
    private readonly getNearestStationsGQL: GetNearestStationsGQL
  ) {
  }

  getAddressesBy(text: string): Observable<AutocompleteAddressFragment[]> {
    return this.getAddressesGQL
      .watch({ text })
      .valueChanges
      .pipe(
        retry(3),
        map((result: ApolloQueryResult<GetAddressesQuery>) => result.data.getAutocompleteAddressesBy)
      );
  }

  getNearestAddressesBy(longitude: number, latitude: number): Observable<NearestTravelPointFragment[]> {
    return this.getNearestAddressesGQL
      .watch({
        longitude,
        latitude,
        radiusInKilometers: this.radiusInKilometers
      })
      .valueChanges
      .pipe(
        retry(3),
        map((result: ApolloQueryResult<GetNearestAddressesQuery>) => result.data.getNearestAddressesBy)
      );
  }

  getNearestStationsBy(longitude: number, latitude: number): Observable<NearestTravelPointFragment[]> {
    return this.getNearestStationsGQL
      .watch({
        longitude,
        latitude,
        radiusInKilometers: this.radiusInKilometers
      })
      .valueChanges
      .pipe(
        retry(3),
        map((result: ApolloQueryResult<GetNearestStationsQuery>) => result.data.getNearestStationsBy)
      );
  }
}
