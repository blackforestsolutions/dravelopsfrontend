import { Injectable } from '@angular/core';
import { AutocompleteTravelPointFragment, GetAddressesGQL, GetAddressesQuery } from '../model/generated';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client';

@Injectable({
  providedIn: 'root'
})
export class TravelPointApiService {

  constructor(
    private readonly getAddressesGQL: GetAddressesGQL
  ) {
  }

  getAddressesBy(text: string): Observable<AutocompleteTravelPointFragment[]> {
    return this.getAddressesGQL
      .watch({ text })
      .valueChanges
      .pipe(
        retry(3),
        map((result: ApolloQueryResult<GetAddressesQuery>) => result.data.getAutocompleteAddressesBy)
      );
  }
}
