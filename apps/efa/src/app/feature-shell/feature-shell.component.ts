import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiToken } from '../shared/model/api-token';

@Component({
  selector: 'dravelopsefafrontend-feature-shell',
  templateUrl: './feature-shell.component.html',
  styleUrls: ['./feature-shell.component.scss']
})
export class FeatureShellComponent {

  constructor(
    private readonly router: Router
  ) {
  }

  handleApiTokenEvent(apiToken: ApiToken): void {
    const { isRoundTrip, departureCoordinate, arrivalCoordinate, outwardJourney, backwardJourney } = apiToken;
    const outwardJourneyDateTime: number = outwardJourney.dateTime.getTime();
    const outwardJourneyIsArrivalDateTime: boolean = outwardJourney.isArrivalDateTime;

    if (isRoundTrip) {
      const backwardJourneyDateTime: number = backwardJourney.dateTime.getTime();
      const backwardJourneyIsArrivalDateTime: boolean = backwardJourney.isArrivalDateTime;
      this.router.navigate([
        '',
        isRoundTrip,
        departureCoordinate.latitude,
        departureCoordinate.longitude,
        arrivalCoordinate.latitude,
        arrivalCoordinate.longitude,
        outwardJourneyDateTime,
        outwardJourneyIsArrivalDateTime,
        backwardJourneyDateTime,
        backwardJourneyIsArrivalDateTime
      ]);
    } else {
      this.router.navigate([
        '',
        isRoundTrip,
        departureCoordinate.latitude,
        departureCoordinate.longitude,
        arrivalCoordinate.latitude,
        arrivalCoordinate.longitude,
        outwardJourneyDateTime,
        outwardJourneyIsArrivalDateTime
      ]);
    }
  }

}
