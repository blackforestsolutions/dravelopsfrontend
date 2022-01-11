import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TABLET_BREAKPOINT } from '../../../index';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[dravelopssharedfrontendIfTabletView]'
})
export class IfTabletViewDirective implements OnInit {

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(`(min-width: ${TABLET_BREAKPOINT}px)`)
      .pipe(map((breakPointState: BreakpointState) => breakPointState.matches))
      .subscribe((isTabletView: boolean) => this.displayHost(isTabletView));
  }

  private displayHost(isTabletView: boolean): void {
    if (isTabletView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
