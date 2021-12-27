import { Component, EventEmitter, Output } from '@angular/core';
import { ApiToken } from '../../domain/model/api-token';
import { NearestTravelPointFragment } from '../../domain/model/generated';

@Component({
  selector: 'dravelopsefafrontend-journey-search',
  templateUrl: './journey-search.component.html',
  styleUrls: ['./journey-search.component.scss']
})
export class JourneySearchComponent {
  @Output() readonly submitApiTokenEvent = new EventEmitter<ApiToken>();

  selectedDeparture: NearestTravelPointFragment;
  selectedArrival: NearestTravelPointFragment;
  selectedTabIndex = 0;

  handleDepartureSelectEvent(selectedDeparture: NearestTravelPointFragment): void {
    this.selectedDeparture = selectedDeparture;
  }

  handleArrivalSelectEvent(selectedArrival: NearestTravelPointFragment): void {
    this.selectedArrival = selectedArrival;
  }

  passSubmitApiTokenEvent(apiToken: ApiToken): void {
    this.submitApiTokenEvent.emit(apiToken);
  }
}