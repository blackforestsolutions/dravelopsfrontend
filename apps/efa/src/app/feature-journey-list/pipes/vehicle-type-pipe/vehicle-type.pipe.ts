import { Pipe, PipeTransform } from '@angular/core';
import { VehicleType } from '@dravelopsfrontend/generated-content';

@Pipe({
  name: 'vehicleType'
})
export class VehicleTypePipe implements PipeTransform {

  transform(value: string): string {
    const vehicleType: VehicleType = VehicleType[value];

    if (vehicleType === VehicleType.WALK || vehicleType === VehicleType.TRANSIT) {
      return 'directions_walk';
    }
    if (vehicleType === VehicleType.BICYCLE) {
      return 'directions_bike';
    }
    if (vehicleType === VehicleType.CAR) {
      return 'directions_car';
    }
    // cable car and tram have the same string for an enum
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (vehicleType === VehicleType.TRAM || vehicleType === VehicleType.FUNICULAR || vehicleType === VehicleType.CABLE_CAR) {
      return 'tram';
    }
    if (vehicleType === VehicleType.SUBWAY) {
      return 'subway';
    }
    if (vehicleType === VehicleType.RAIL) {
      return 'directions_railway';
    }
    if (vehicleType === VehicleType.BUS) {
      return 'directions_bus';
    }
    if (vehicleType === VehicleType.FERRY || vehicleType === VehicleType.GONDOLA) {
      return 'directions_boat';
    }
    if (vehicleType === VehicleType.AIRPLANE) {
      return 'flight';
    }

    return 'help';
  }

}
