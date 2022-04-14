export interface ExchangeResponse {
  base: string;
  date: string;
  rates: Rate;
}

export interface Rate {
  [key: string]: number;
}

export interface RequestValue {
  base: string;
  options: string[];
}
