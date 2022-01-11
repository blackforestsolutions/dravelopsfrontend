import { Component, Input } from '@angular/core';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../domain/model/generated';
import { TravelPointSearchType } from '../travel-point-search/travel-point-search.component';

@Component({
  selector: 'dravelopsefafrontend-travel-point-list-item',
  templateUrl: './travel-point-list-item.component.html',
  styleUrls: ['./travel-point-list-item.component.scss']
})
export class TravelPointListItemComponent {
  @Input() travelPoint: AutocompleteAddressFragment | NearestTravelPointFragment;
  @Input() travelPointSearchType: TravelPointSearchType;
}
