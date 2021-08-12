import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShellModule } from '@dravelopsfrontend/shell';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ShellModule.forRoot(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
