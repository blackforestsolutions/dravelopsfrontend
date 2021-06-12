import { Component, Input } from '@angular/core';
import { VehicleType } from '@dravelopsfrontend/generated-content';

@Component({
  selector: 'dravelopsefafrontend-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent {

  @Input() key: VehicleType;
  VehicleType = VehicleType;

}
