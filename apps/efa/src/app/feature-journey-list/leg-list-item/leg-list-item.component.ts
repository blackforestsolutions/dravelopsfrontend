import { Component, Input } from '@angular/core';
import { LegFragment } from '@dravelopsfrontend/generated-content';

@Component({
  selector: 'dravelopsefafrontend-leg-list-item',
  templateUrl: './leg-list-item.component.html',
  styleUrls: ['./leg-list-item.component.scss']
})
export class LegListItemComponent {
  @Input() leg: LegFragment;

  showIntermediateStops = false;
  showFootpathMap = false;


  toggleIntermediateStops(): void {
    this.showIntermediateStops = !this.showIntermediateStops;
  }


  toggleFootpathMap(): void {
    this.showFootpathMap = !this.showFootpathMap;
  }

}
