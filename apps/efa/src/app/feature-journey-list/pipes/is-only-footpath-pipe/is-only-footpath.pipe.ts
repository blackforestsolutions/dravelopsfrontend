import { Pipe, PipeTransform } from '@angular/core';
import { JourneyFragment, VehicleType } from '@dravelopsfrontend/generated-content';

@Pipe({
  name: 'isOnlyFootpath'
})
export class IsOnlyFootpathPipe implements PipeTransform {

  transform(journey: JourneyFragment): boolean {
    if (!journey) {
      return null;
    }
    return this.checkIfJourneyIsFootpath(journey);
  }

  private checkIfJourneyIsFootpath(journey: JourneyFragment): boolean {
    return journey.legs.length === 1 && journey.legs[0].vehicleType === VehicleType.WALK;
  }
}
