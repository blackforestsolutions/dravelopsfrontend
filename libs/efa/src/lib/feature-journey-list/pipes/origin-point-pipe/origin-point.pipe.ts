import { Pipe, PipeTransform } from '@angular/core';
import { WalkStep } from '../../../domain/model/generated';
import { CompassDirectionPipe } from '../compass-direction-pipe/compass-direction.pipe';

@Pipe({
  name: 'originPoint'
})
export class OriginPointPipe implements PipeTransform {

  constructor(
    private compassDirectionPipe: CompassDirectionPipe
  ) {
  }

  transform(walkStep: WalkStep, nextWalkStep: WalkStep): string {
    const compassDirection: string = this.compassDirectionPipe.transform(walkStep.compassDirection);

    if (walkStep.isStreetNameGenerated) {
      return `Start nach ${compassDirection}${this.addNextWalkStepStreetName(nextWalkStep)}`;
    }
    return `Start auf ${walkStep.streetName} nach ${compassDirection}${this.addNextWalkStepStreetName(nextWalkStep)}`;
  }

  private addNextWalkStepStreetName(nextWalkStep: WalkStep): string {
    if (nextWalkStep && !nextWalkStep.isStreetNameGenerated) {
      return ` Richtung ${nextWalkStep.streetName}`;
    }
    return '';
  }

}
