import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WalkStep, WalkStepFragment } from '@dravelopsfrontend/generated-content';

@Component({
  selector: 'dravelopsefafrontend-walk-step-list',
  templateUrl: './walk-step-list.component.html',
  styleUrls: ['./walk-step-list.component.scss']
})
export class WalkStepListComponent {
  @Input() walkSteps: WalkStepFragment[];
  @Output() walkStepSelectedEvent = new EventEmitter<WalkStep>();

  emitWalkStepSelectedEvent(walkStep: WalkStep): void {
    this.walkStepSelectedEvent.emit(walkStep);
  }
}
