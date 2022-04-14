import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ExchangeResponse, RequestValue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  public getExchangeRate(
    requestValue: RequestValue
  ): Observable<ExchangeResponse> {
    return this.http
      .get<ExchangeResponse>(
        `${this.baseUrl}?&base=${requestValue.base}&symbols=${requestValue.options}`
      )
      .pipe(
        map((data: ExchangeResponse) => {
          return { base: data.base, date: data.date, rates: data.rates };
        })
      );
  }

  public getCurrencyPrice(requestValue: RequestValue): Observable<number> {
    return this.http
      .get<ExchangeResponse>(
        `${this.baseUrl}?&base=${requestValue.base}&symbols=${requestValue.options}`
      )
      .pipe(
        map((data: ExchangeResponse) => {
          return data.rates[requestValue.options[0]];
        })
      );
  }
}
