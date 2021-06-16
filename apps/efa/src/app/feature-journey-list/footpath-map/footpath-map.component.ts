import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PointFragment } from '@dravelopsfrontend/generated-content';

@Component({
  selector: 'dravelopsefafrontend-footpath-map',
  templateUrl: './footpath-map.component.html',
  styleUrls: ['./footpath-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FootpathMapComponent {
  @Input() waypoints: PointFragment[];
}
