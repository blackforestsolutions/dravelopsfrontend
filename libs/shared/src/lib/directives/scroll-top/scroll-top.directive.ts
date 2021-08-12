import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Directive({
  selector: '[dravelopssharedfrontendScrollTop]'
})
export class ScrollTopDirective implements OnInit {
  @Input() hiddenOnStartPage: boolean;
  @HostBinding('style.display') display;

  constructor(
    private readonly viewportScroller: ViewportScroller
  ) {
  }

  ngOnInit(): void {
    this.displayHost();
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll(): void {
    this.displayHost();
  }

  @HostListener('click') scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  private displayHost(): void {
    if (this.hiddenOnStartPage && !window.pageYOffset) {
      this.display = 'none';
    } else {
      this.display = 'unset';
    }
  }

}
