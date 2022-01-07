import { Inject, Pipe, PipeTransform } from '@angular/core';
import { RADIUS_IN_KILOMETERS, USE_NEAREST_ADDRESS } from '@dravelopsfrontend/shared';

@Pipe({
  name: 'travelPointSearchNoResultMessage'
})
export class TravelPointSearchNoResultMessagePipe implements PipeTransform {

  constructor(
    @Inject(RADIUS_IN_KILOMETERS) private readonly radiusInKilometers: number,
    @Inject(USE_NEAREST_ADDRESS) private readonly useNearestAddress: boolean
  ) {
  }

  // No result message does not depend on input params,
  // but it is useful to put this code in a pipe as it reduce test code
  // in host component.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown): string {
    return `Keine ${this.getTravelPointName()} innerhalb von ${this.radiusInKilometers} Kilometern gefunden.`;
  }

  private getTravelPointName(): string {
    if (this.useNearestAddress) {
      return 'Adresse';
    }
    return 'Haltestelle';
  }

}
