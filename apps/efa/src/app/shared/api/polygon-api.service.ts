import {Injectable} from '@angular/core';
import {GetOperatingAreaGQL, GetOperatingAreaQuery, PolygonFragment} from "@dravelopsfrontend/generated-content";
import {Observable} from "rxjs";
import {map, retry} from "rxjs/operators";
import {ApolloQueryResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class PolygonApiService {

  constructor(
    private readonly getOperatingAreaGQL: GetOperatingAreaGQL
  ) {
  }

  getOperatingArea(): Observable<PolygonFragment> {
    return this.getOperatingAreaGQL
      .watch()
      .valueChanges
      .pipe(
        retry(3),
        map((result: ApolloQueryResult<GetOperatingAreaQuery>) => result.data.getOperatingArea)
      );
  }
}
