import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormModule } from './form/form.module';
import { CounterModule } from './counter/counter.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormModule, CounterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
