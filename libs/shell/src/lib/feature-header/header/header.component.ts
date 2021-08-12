import {Component, Inject} from '@angular/core';
import { HEADER_TITLE } from '@dravelopsfrontend/shared';

@Component({
  selector: 'dravelopsfrontendshell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    @Inject(HEADER_TITLE) public headerTitle: string
  ) {
  }
}

