export interface ExchangeRateResponse {
  rates: CurrencyRate;
}

export interface CurrencyRate {
  [key: string]: number;
}

export interface RequestParams {
  amount?: string;
  base: string;
  options: string[];
}
