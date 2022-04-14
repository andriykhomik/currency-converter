import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { ExchangeRateResponse } from '../../interfaces/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public exchangeRate$!: Observable<ExchangeRateResponse>;
  public currencyList: string[] = ['EUR', 'USD'];
  public time: Date = new Date();
  private destroy$: Subject<void> = new Subject<void>();
  private interval: number = setInterval(() => {
    this.getExchangeRate();
    this.time = new Date();
  }, 60000);

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getExchangeRate();
  }

  private getExchangeRate(): void {
    this.exchangeRate$ = this.currencyService
      .getCurrencyPrice({ base: 'UAH', options: this.currencyList })
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
