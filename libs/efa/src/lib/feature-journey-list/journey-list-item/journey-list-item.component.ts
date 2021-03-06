import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JourneyFragment } from '../../domain/model/generated';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { TABLET_BREAKPOINT } from '@dravelopsfrontend/shared';

const FOOTPATH_PRICE = 0;
const DEFAULT_MOCK_PRICE = 10;

@Component({
  selector: 'dravelopsefafrontend-journey-list-item',
  templateUrl: './journey-list-item.component.html',
  styleUrls: ['./journey-list-item.component.scss']
})
export class JourneyListItemComponent implements OnInit {

  @Input() isJourneyBuyable: boolean;
  @Input() buttonSelectText: string;
  @Input() journey: JourneyFragment;
  @Output() journeySelectedEvent = new EventEmitter<JourneyFragment>();
  @Output() journeyExpandedEvent = new EventEmitter<JourneyFragment>();

  isTabletView$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private isOnlyFootpath: IsOnlyFootpathPipe
  ) {
  }

  ngOnInit() {
    this.isTabletView$ = this.breakpointObserver.observe(`(min-width: ${TABLET_BREAKPOINT}px)`).pipe(
      map((breakPointState: BreakpointState) => breakPointState.matches)
    );
  }

  getPrice(): number {
    if (this.isOnlyFootpath.transform(this.journey)) {
      return FOOTPATH_PRICE;
    }
    return DEFAULT_MOCK_PRICE;
  }

  emitJourneySelectedEvent(): void {
    this.journeySelectedEvent.emit(this.journey);
  }

  emitJourneyExpandedEvent(): void {
    this.journeyExpandedEvent.emit(this.journey);
  }
}
