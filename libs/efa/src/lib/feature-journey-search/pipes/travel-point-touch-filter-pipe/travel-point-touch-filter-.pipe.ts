import { Inject, Pipe, PipeTransform } from '@angular/core';
import { MAX_TRAVEL_POINTS_IN_SMALL_VIEW, TOUCH_BREAKPOINT } from '@dravelopsfrontend/shared';
import { AutocompleteAddressFragment, NearestTravelPointFragment } from '../../../domain/model/generated';
import { BreakpointObserver } from '@angular/cdk/layout';

@Pipe({
  name: 'travelPointTouchFilter'
})
export class TravelPointTouchFilterPipe implements PipeTransform {

  constructor(
    @Inject(MAX_TRAVEL_POINTS_IN_SMALL_VIEW) private readonly maxTravelPointsInSmallView: number,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  transform(travelPoints: AutocompleteAddressFragment[] | NearestTravelPointFragment[]): AutocompleteAddressFragment[] | NearestTravelPointFragment[] {
    if (!travelPoints) {
      return null;
    }
    if (this.breakpointObserver.isMatched(`(max-width: ${TOUCH_BREAKPOINT}px)`)) {
      return travelPoints.filter((_, index: number) => index < this.maxTravelPointsInSmallView);
    }
    return travelPoints;
  }

}
