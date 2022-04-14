import { Component, Input, OnInit } from '@angular/core';
import { ExchangeResponse } from '../../interfaces';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  @Input() public exchangeResponse!: ExchangeResponse;
  public rateCurrency: string[] = [];

  ngOnInit(): void {
    this.rateCurrency = Object.keys(this.exchangeResponse.rates);
  }
}
