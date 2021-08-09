import { Pipe, PipeTransform } from '@angular/core';
import { WalkingDirection, WalkStep } from '@dravelopsfrontend/generated-content';

@Pipe({
  name: 'destinationPoint'
})
export class DestinationPointPipe implements PipeTransform {

  transform(walkStep: WalkStep): string {
    return `Ziel${this.addStreetName(walkStep)} ${this.getWalkingDirection(walkStep.walkingDirection)}`;
  }

  private addStreetName(walkStep: WalkStep): string {
    if (walkStep.isStreetNameGenerated) {
      return '';
    }
    return ` ${walkStep.streetName}`;
  }

  private getWalkingDirection(value: string): string {
    const walkingDirection: WalkingDirection = WalkingDirection[value];

    if (walkingDirection === WalkingDirection.CONTINUE || walkingDirection === WalkingDirection.DEPART) {
      return `auf diesem Weg`;
    }
    if (walkingDirection === WalkingDirection.HARD_LEFT) {
      return 'scharf links';
    }
    if (walkingDirection === WalkingDirection.LEFT || walkingDirection === WalkingDirection.UTURN_LEFT) {
      return 'auf der linken Seite';
    }
    if (walkingDirection === WalkingDirection.SLIGHTLY_LEFT) {
      return 'leicht links';
    }
    if (walkingDirection === WalkingDirection.HARD_RIGHT) {
      return 'scharf rechts';
    }
    if (walkingDirection === WalkingDirection.RIGHT || walkingDirection === WalkingDirection.UTURN_RIGHT) {
      return 'auf der rechten Seite';
    }
    if (walkingDirection === WalkingDirection.SLIGHTLY_RIGHT) {
      return 'leicht rechts';
    }
    if (walkingDirection === WalkingDirection.CIRCLE_CLOCKWISE || walkingDirection === WalkingDirection.CIRCLE_COUNTERCLOCKWISE) {
      return 'im Kreisverkehr';
    }
    if (walkingDirection === WalkingDirection.ELEVATOR) {
      return 'am Aufzug';
    }
    return 'erreicht';
  }

}
