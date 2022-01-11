import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../domain/model/generated';
import { TravelPointSearchType } from '../travel-point-search/travel-point-search.component';

@Component({
  selector: 'dravelopsefafrontend-travel-point-list',
  templateUrl: './travel-point-list.component.html',
  styleUrls: ['./travel-point-list.component.scss']
})
export class TravelPointListComponent {
  @Input() travelPoints: AutocompleteAddressFragment[] | NearestTravelPointFragment[];
  @Input() travelPointSearchType: TravelPointSearchType;
  @Input() noResultMessage: string;
  @Output() travelPointSelectEvent = new EventEmitter<AutocompleteAddressFragment | NearestTravelPointFragment>();

  handleTravelPointSelectEvent(travelPoint: AutocompleteAddressFragment | NearestTravelPointFragment): void {
    this.travelPointSelectEvent.emit(travelPoint);
  }
}
