import { Pipe, PipeTransform } from '@angular/core';
import { WalkStep } from '../../../domain/model/generated';
import { OriginPointPipe } from '../origin-point-pipe/origin-point.pipe';
import { DestinationPointPipe } from '../destination-point-pipe/destination-point.pipe';
import { WalkingDirectionPipe } from '../walking-direction-pipe/walking-direction.pipe';

@Pipe({
  name: 'walkStepDescription'
})
export class WalkStepDescriptionPipe implements PipeTransform {

  constructor(
    private originPointPipe: OriginPointPipe,
    private destinationPointPipe: DestinationPointPipe,
    private walkingDirectionPipe: WalkingDirectionPipe
  ) {
  }

  transform(walkStep: WalkStep, nextWalkStep: WalkStep): string {
    if (walkStep.isDestinationPoint) {
      return this.destinationPointPipe.transform(walkStep);
    }
    if (walkStep.isOriginPoint) {
      return this.originPointPipe.transform(walkStep, nextWalkStep);
    }
    return this.walkingDirectionPipe.transform(walkStep, nextWalkStep);
  }

}
