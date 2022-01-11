import { Directive, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[dravelopssharedfrontendAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(
    private matInput: MatInput
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.matInput.focus());
  }

}
