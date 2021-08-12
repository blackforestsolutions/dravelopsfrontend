import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HEADER_TITLE } from '@dravelopsfrontend/shared';

@Component({
  selector: 'dravelopsfrontendshell-feature-shell',
  templateUrl: './feature-shell.component.html',
  styleUrls: ['./feature-shell.component.scss']
})
export class FeatureShellComponent implements OnInit {
  constructor(
    @Inject(HEADER_TITLE) private headerTitle: string,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.headerTitle);
  }
}
