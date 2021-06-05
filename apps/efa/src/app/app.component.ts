import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CUSTOMER_DIRECTORY } from '../environments/config-tokens';

@Component({
  selector: 'dravelopsefafrontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') activeThemeCssClass: string;

  constructor(
    @Inject(CUSTOMER_DIRECTORY) private customerDirectory: string,
    private overlayContainer: OverlayContainer
  ) {
  }

  ngOnInit(): void {
    this.setTheme();
  }

  private setTheme(): void {
    const cssClass = `${this.customerDirectory}-theme`;
    const classList: DOMTokenList = this.overlayContainer.getContainerElement().classList;

    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, cssClass);
    } else {
      classList.add(cssClass);
    }

    this.activeThemeCssClass = cssClass;
  }
}
