import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiToken } from '../shared/model/api-token';
import { CUSTOMER_DIRECTORY } from '../../environments/config-tokens';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'dravelopsefafrontend-feature-shell',
  templateUrl: './feature-shell.component.html',
  styleUrls: ['./feature-shell.component.scss']
})
export class FeatureShellComponent implements OnInit {
  @HostBinding('class') activeThemeCssClass: string;

  constructor(
    @Inject(CUSTOMER_DIRECTORY) private customerDirectory: string,
    private readonly router: Router,
    private readonly overlayContainer: OverlayContainer
  ) {
  }

  ngOnInit(): void {
    this.setTheme();
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

  private setTheme(): void {
    const cssClass = `${this.customerDirectory}-theme`;
    const classList: DOMTokenList = this.overlayContainer.getContainerElement().classList;

    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, cssClass);
    } else {
      classList.add(cssClass);
    }

    this.activeThemeCssClass = cssClass;
  }

}
