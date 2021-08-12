import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'dravelopssharedfrontend-theme-emitter',
  templateUrl: './theme-emitter.component.html',
  styleUrls: ['./theme-emitter.component.scss']
})
export class ThemeEmitterComponent implements OnInit {
  @ViewChild('primary', {static: true}) private primary: ElementRef;
  @ViewChild('secondary', {static: true}) private secondary: ElementRef;
  @ViewChild('warn', {static: true}) private warn: ElementRef;

  primaryColor: string;
  secondaryColor: string;
  warnColor: string;

  ngOnInit(): void {
    this.primaryColor = getComputedStyle(this.primary.nativeElement).color;
    this.secondaryColor = getComputedStyle(this.secondary.nativeElement).color;
    this.warnColor = getComputedStyle(this.warn.nativeElement).color;
  }

}
