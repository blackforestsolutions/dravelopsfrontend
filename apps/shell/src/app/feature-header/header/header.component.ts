import {Component, Inject} from '@angular/core';
import {CUSTOMER_DIRECTORY, HEADER_TITLE} from "../../../environments/app-environmnet";

@Component({
  selector: 'dravelopsfrontendshell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    @Inject(CUSTOMER_DIRECTORY) private customerDirectory: string,
    @Inject(HEADER_TITLE) public headerTitle: string
  ) {
  }

  getLogo(): string {
    return `assets/${this.customerDirectory}/logo.svg`;
  }
}

