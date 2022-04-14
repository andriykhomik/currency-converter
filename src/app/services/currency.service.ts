import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ExchangeRateResponse, RequestParams } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  public getCurrencyPrice(
    requestValue: RequestParams
  ): Observable<ExchangeRateResponse> {
    return this.http
      .get<ExchangeRateResponse>(`${this.baseUrl}/latest?`, {
        params: {
          base: requestValue.base,
          symbols: `${requestValue.options}`,
        },
      })
      .pipe(
        map((data: ExchangeRateResponse) => {
          return { rates: data.rates };
        })
      );
  }

  public getExchangeRate(requestValue: RequestParams): Observable<number> {
    return this.http
      .get<ExchangeRateResponse>(`${this.baseUrl}/latest?`, {
        params: {
          base: requestValue.base,
          symbols: requestValue.options,
        },
      })
      .pipe(
        map((data: ExchangeRateResponse) => {
          return data.rates[requestValue.options[0]];
        })
      );
  }
}
