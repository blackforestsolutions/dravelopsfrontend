import { Component, Input, OnInit } from '@angular/core';
import { LegFragment } from '@dravelopsfrontend/generated-content';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const THIRD_GRID_ROW = 3;

@Component({
  selector: 'dravelopsefafrontend-leg-list-item',
  templateUrl: './leg-list-item.component.html',
  styleUrls: ['./leg-list-item.component.scss']
})
export class LegListItemComponent implements OnInit {
  @Input() leg: LegFragment;

  showIntermediateStops = false;
  showFootpathMap = false;
  isTabletView$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.isTabletView$ = this.breakpointObserver.observe('(min-width: 720px)').pipe(
      map((breakPointState: BreakpointState) => breakPointState.matches)
    );
  }

  toggleIntermediateStops(): void {
    this.showIntermediateStops = !this.showIntermediateStops;
  }

  toggleFootpathMap(): void {
    this.showFootpathMap = !this.showFootpathMap;
  }

  positionArrivalTime(): string {
    if (this.showFootpathMap) {
      return '4 / 5';
    }
    if (this.showIntermediateStops) {
      const minGridRow: number = THIRD_GRID_ROW + this.leg.intermediateStops.length;
      return `${minGridRow} / ${minGridRow + 1}`;
    }
    return '3 / 4';
  }
}
