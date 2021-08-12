import { Pipe, PipeTransform } from '@angular/core';
import { WalkingDirection, WalkStep } from '@dravelopsfrontend/generated-content';

@Pipe({
  name: 'walkStepArrowIcon'
})
export class WalkStepArrowIconPipe implements PipeTransform {

  transform(walkStep: WalkStep): string {
    if (walkStep.isOriginPoint || walkStep.isDestinationPoint) {
      return 'place';
    }
    return this.extractWalkingDirectionIconFrom(walkStep);
  }

  private extractWalkingDirectionIconFrom(walkStep: WalkStep): string {
    const walkingDirection: WalkingDirection = WalkingDirection[walkStep.walkingDirection];

    if (walkingDirection === WalkingDirection.DEPART || walkingDirection === WalkingDirection.CONTINUE) {
      return 'arrow_upward';
    }
    if (walkingDirection === WalkingDirection.HARD_LEFT || walkingDirection === WalkingDirection.LEFT || walkingDirection === WalkingDirection.SLIGHTLY_LEFT) {
      return 'subdirectory_arrow_left';
    }
    if (walkingDirection === WalkingDirection.HARD_RIGHT || walkingDirection === WalkingDirection.RIGHT || walkingDirection === WalkingDirection.SLIGHTLY_RIGHT) {
      return 'subdirectory_arrow_right';
    }
    if (walkingDirection === WalkingDirection.CIRCLE_CLOCKWISE || walkingDirection === WalkingDirection.CIRCLE_COUNTERCLOCKWISE) {
      return 'adjust';
    }
    if (walkingDirection === WalkingDirection.ELEVATOR) {
      return 'elevator';
    }
    if (walkingDirection === WalkingDirection.UTURN_LEFT) {
      return 'rotate_left';
    }
    if (walkingDirection === WalkingDirection.UTURN_RIGHT) {
      return 'rotate_right';
    }
    return 'help';
  }

}
