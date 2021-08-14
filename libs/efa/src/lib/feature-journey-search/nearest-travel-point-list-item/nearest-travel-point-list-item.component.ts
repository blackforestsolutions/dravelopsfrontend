import { Component, Input } from '@angular/core';
import { NearestTravelPointFragment } from '../../domain/model/generated';

@Component({
  selector: 'dravelopsefafrontend-nearest-travel-point-list-item',
  templateUrl: './nearest-travel-point-list-item.component.html',
  styleUrls: ['./nearest-travel-point-list-item.component.scss']
})
export class NearestTravelPointListItemComponent {
  @Input() nearestTravelPoint: NearestTravelPointFragment;
}
