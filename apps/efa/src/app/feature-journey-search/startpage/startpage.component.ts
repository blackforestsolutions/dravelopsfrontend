import { Component, Inject } from '@angular/core';
import { CUSTOMER_DIRECTORY } from '../../../environments/config-tokens';

@Component({
  selector: 'dravelopsefafrontend-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent {

  constructor(
    @Inject(CUSTOMER_DIRECTORY) private customerDirectory: string
  ) {
  }

  getStartPage(): string {
    return `assets/${this.customerDirectory}/startpage.jpg`;
  }

}
