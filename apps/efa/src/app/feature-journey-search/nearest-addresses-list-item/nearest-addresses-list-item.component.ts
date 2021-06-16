import {Component, Input} from '@angular/core';
import {NearestAddressFragment} from "@dravelopsfrontend/generated-content";

@Component({
  selector: 'dravelopsefafrontend-nearest-addresses-list-item',
  templateUrl: './nearest-addresses-list-item.component.html',
  styleUrls: ['./nearest-addresses-list-item.component.scss']
})
export class NearestAddressesListItemComponent {
  @Input() nearestAddress: NearestAddressFragment;
}
