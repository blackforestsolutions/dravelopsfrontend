import { Component, Inject } from '@angular/core';
import { HEADER_TITLE } from '../../../index';

@Component({
  selector: 'dravelopssharedfrontend-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    @Inject(HEADER_TITLE) public headerTitle: string
  ) {
  }
}

