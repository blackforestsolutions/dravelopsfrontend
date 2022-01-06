import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TOUCH_BREAKPOINT } from '../../../index';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[dravelopssharedfrontendIfTouchView]'
})
export class IfTouchViewDirective implements OnInit {

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(`(min-width: ${TOUCH_BREAKPOINT}px)`)
      .pipe(map((breakPointState: BreakpointState) => breakPointState.matches))
      .subscribe((isTouchView: boolean) => this.displayHost(isTouchView));
  }

  private displayHost(isTouchView: boolean): void {
    if (isTouchView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
