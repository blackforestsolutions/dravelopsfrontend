import { Component, Input } from '@angular/core';
import { LegFragment, VehicleType } from '@dravelopsfrontend/generated-content';

@Component({
  selector: 'dravelopsefafrontend-leg-list',
  templateUrl: './leg-list.component.html',
  styleUrls: ['./leg-list.component.scss']
})
export class LegListComponent {

  @Input() legs: LegFragment[];
  VehicleType = VehicleType;

}
