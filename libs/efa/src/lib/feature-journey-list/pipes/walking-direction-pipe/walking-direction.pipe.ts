import { Pipe, PipeTransform } from '@angular/core';
import { WalkingDirection, WalkStep } from '../../../domain/model/generated';
import { CompassDirectionPipe } from '../compass-direction-pipe/compass-direction.pipe';

@Pipe({
  name: 'walkingDirection'
})
export class WalkingDirectionPipe implements PipeTransform {

  constructor(
    private compassDirectionPipe: CompassDirectionPipe
  ) {
  }

  transform(walkStep: WalkStep, nextWalkStep: WalkStep): string {
    const walkingDirection: WalkingDirection = WalkingDirection[walkStep.walkingDirection];

    if (walkingDirection === WalkingDirection.DEPART) {
      return this.getDepartMessage(walkStep, nextWalkStep);
    }
    if (walkingDirection === WalkingDirection.CONTINUE) {
      return `Weiter${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.HARD_LEFT) {
      return `Scharf links abbiegen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.LEFT) {
      return `Links abbiegen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.SLIGHTLY_LEFT) {
      return `Leicht links abbiegen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.HARD_RIGHT) {
      return `Scharf rechts abbiegen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.RIGHT) {
      return `Rechts abbiegen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.SLIGHTLY_RIGHT) {
      return `Leicht rechts abbiegen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.CIRCLE_CLOCKWISE) {
      return `Im Kreisverkehr im Uhrzeigersinn ${walkStep.circleExit}. Ausfahrt nehmen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.CIRCLE_COUNTERCLOCKWISE) {
      return `Im Kreisverkehr gegen den Uhrzeigersinn ${walkStep.circleExit}. Ausfahrt nehmen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.ELEVATOR) {
      return `Mit dem Aufzug fahren${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.UTURN_LEFT) {
      return `Nach links umdrehen${this.addWalkStepStreetName(walkStep)}`;
    }
    if (walkingDirection === WalkingDirection.UTURN_RIGHT) {
      return `Nach rechts umdrehen${this.addWalkStepStreetName(walkStep)}`;
    }
    return '';
  }

  private getDepartMessage(walkStep: WalkStep, nextWalkStep: WalkStep): string {
    const compassDirection: string = this.compassDirectionPipe.transform(walkStep.compassDirection);

    if (walkStep.isStreetNameGenerated) {
      return `Nach ${compassDirection}${this.addNextWalkStepStreetName(nextWalkStep)}`;
    }
    return `Auf ${walkStep.streetName} nach ${compassDirection}${this.addNextWalkStepStreetName(nextWalkStep)}`;
  }

  private addWalkStepStreetName(walkStep: WalkStep): string {
    if (walkStep.isStreetNameGenerated) {
      return '';
    }
    return ` auf ${walkStep.streetName}`;
  }

  private addNextWalkStepStreetName(nextWalkStep: WalkStep): string {
    if (nextWalkStep && !nextWalkStep.isStreetNameGenerated) {
      return ` Richtung ${nextWalkStep.streetName}`;
    }
    return '';
  }
}
