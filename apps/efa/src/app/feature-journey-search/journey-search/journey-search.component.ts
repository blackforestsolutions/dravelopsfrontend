import {Component, EventEmitter, Output} from '@angular/core';
import {ApiToken} from "../../shared/model/api-token";
import {NearestAddressFragment} from "@dravelopsfrontend/generated-content";

@Component({
  selector: 'dravelopsefafrontend-journey-search',
  templateUrl: './journey-search.component.html',
  styleUrls: ['./journey-search.component.scss']
})
export class JourneySearchComponent {
  @Output() readonly submitApiTokenEvent = new EventEmitter<ApiToken>();

  selectedDeparture: NearestAddressFragment;
  selectedArrival: NearestAddressFragment;
  selectedTabIndex = 0;

  setSelectedTabIndex(selectedTabIndex: number): void {
    this.selectedTabIndex = selectedTabIndex;
  }

  handleDepartureSelectEvent(selectedDeparture: NearestAddressFragment): void {
    this.selectedDeparture = selectedDeparture;
  }

  handleArrivalSelectEvent(selectedArrival: NearestAddressFragment): void {
    this.selectedArrival = selectedArrival;
  }

  passSubmitApiTokenEvent(apiToken: ApiToken): void {
    this.submitApiTokenEvent.emit(apiToken);
  }
}
