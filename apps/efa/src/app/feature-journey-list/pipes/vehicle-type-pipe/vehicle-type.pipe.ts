import { Pipe, PipeTransform } from '@angular/core';
import { VehicleType } from '@dravelopsfrontend/generated-content';

@Pipe({
  name: 'vehicleType'
})
export class VehicleTypePipe implements PipeTransform {

  transform(value: string): string {
    const vehicleType: VehicleType = VehicleType[value];

    if (vehicleType === VehicleType.WALK) {
      return 'Fußweg';
    }
    if (vehicleType === VehicleType.TRANSIT) {
      return 'Transit';
    }
    if (vehicleType === VehicleType.BICYCLE) {
      return 'Fahrrad';
    }
    if (vehicleType === VehicleType.CAR) {
      return 'Auto';
    }
    if (vehicleType === VehicleType.TRAM) {
      return 'Straßenbahn';
    }
    if (vehicleType === VehicleType.FUNICULAR) {
      return 'Seilbahn';
    }
    if (vehicleType === VehicleType.CABLE_CAR) {
      return 'Straßenbahn';
    }
    if (vehicleType === VehicleType.SUBWAY) {
      return 'U-Bahn';
    }
    if (vehicleType === VehicleType.RAIL) {
      return 'Zug';
    }
    if (vehicleType === VehicleType.BUS) {
      return 'Bus';
    }
    if (vehicleType === VehicleType.FERRY) {
      return 'Fähre';
    }
    if (vehicleType === VehicleType.GONDOLA) {
      return 'Gondelboot';
    }
    if (vehicleType === VehicleType.AIRPLANE) {
      return 'Flug';
    }
    return '';
  }

}
