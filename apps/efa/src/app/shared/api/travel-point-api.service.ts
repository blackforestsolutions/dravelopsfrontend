import {Inject, Injectable} from '@angular/core';
import {
  AutocompleteAddressFragment,
  GetAddressesGQL,
  GetAddressesQuery,
  GetNearestAddressesGQL,
  GetNearestAddressesQuery,
  NearestAddressFragment
} from '@dravelopsfrontend/generated-content';
import {map, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client';
import {RADIUS_IN_KILOMETERS} from "../../../environments/config-tokens";

@Injectable({
  providedIn: 'root'
})
export class TravelPointApiService {

  constructor(
    @Inject(RADIUS_IN_KILOMETERS) private readonly radiusInKilometers: number,
    private readonly getAddressesGQL: GetAddressesGQL,
    private readonly getNearestAddressesGQL: GetNearestAddressesGQL
  ) {
  }

  getAddressesBy(text: string): Observable<AutocompleteAddressFragment[]> {
    return this.getAddressesGQL
      .watch({text})
      .valueChanges
      .pipe(
        retry(3),
        map((result: ApolloQueryResult<GetAddressesQuery>) => result.data.getAutocompleteAddressesBy)
      );
  }

  getNearestAddressesBy(longitude: number, latitude: number): Observable<NearestAddressFragment[]> {
    return this.getNearestAddressesGQL
      .watch({
        longitude,
        latitude,
        radiusInKilometers: this.radiusInKilometers,
      })
      .valueChanges
      .pipe(
        retry(3),
        map((result: ApolloQueryResult<GetNearestAddressesQuery>) => result.data.getNearestAddressesBy)
      )
  }
}
