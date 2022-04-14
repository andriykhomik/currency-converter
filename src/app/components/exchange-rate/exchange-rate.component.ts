import { Component, Input, OnInit } from '@angular/core';
import { ExchangeRateResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  @Input() public exchangeRate!: ExchangeRateResponse;
  public currencyRate: string[] = [];

  ngOnInit(): void {
    this.getCurrencyRate();
  }

  private getCurrencyRate(): void {
    this.currencyRate = Object.keys(this.exchangeRate.rates);
  }
}
