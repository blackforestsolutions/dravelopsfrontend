import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {CUSTOMER_DIRECTORY, HEADER_TITLE} from "../environments/app-environmnet";
import {OverlayContainer} from "@angular/cdk/overlay";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'dravelopsfrontendshell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @HostBinding('class') activeThemeCssClass: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(HEADER_TITLE) private headerTitle: string,
    @Inject(CUSTOMER_DIRECTORY) private customerDirectory: string,
    private overlayContainer: OverlayContainer,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.setTheme();
    this.titleService.setTitle(this.headerTitle);
    if (this.document.querySelector('#tabIcon')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.document.querySelector('#tabIcon').href = `assets/${this.customerDirectory}/tabicon.png`;
    }
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
