import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ConverterComponent } from './components/converter/converter.component';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import { NumericInputComponent } from './components/numeric-input/numeric-input.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterComponent,
    ExchangeRateComponent,
    NumericInputComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: 'BASE_URL', useFactory: () => environment.apiUrl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
