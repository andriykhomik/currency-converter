import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private primaryInputValue: number = 0;
  private secondaryInputValue: number = 0;
  public currencyOptions: string[] = ['UAH', 'USD', 'EUR', 'PLN'];
  public form: FormGroup = new FormGroup({
    primarySelectCurrency: new FormControl(this.currencyOptions[0]),
    secondarySelectCurrency: new FormControl(this.currencyOptions[1]),
    primaryCurrencyInput: new FormControl(1),
    secondaryCurrencyInput: new FormControl(1),
  });

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.setValueOnPrimaryChange();
  }

  private getExchangeRate(): Observable<number> {
    const requestValue = {
      amount: this.primaryInputValue.toString(),
      base: this.form.value.primarySelectCurrency,
      options: [this.form.value.secondarySelectCurrency],
    };
    return this.currencyService
      .getExchangeRate(requestValue)
      .pipe(takeUntil(this.destroy$));
  }

  private setValueToInputs(): void {
    this.form.controls['primaryCurrencyInput'].setValue(this.primaryInputValue);
    this.form.controls['secondaryCurrencyInput'].setValue(
      this.secondaryInputValue
    );
  }

  public setValueOnPrimaryChange(): void {
    this.primaryInputValue = this.form.value.primaryCurrencyInput;
    this.getExchangeRate().subscribe((currentRate: number) => {
      this.secondaryInputValue = this.primaryInputValue * currentRate;
      this.setValueToInputs();
    });
  }

  public setValueOnSecondaryChange(): void {
    this.secondaryInputValue = this.form.value.secondaryCurrencyInput;
    this.getExchangeRate().subscribe((currentRate: number) => {
      this.primaryInputValue = this.secondaryInputValue / currentRate;
      this.setValueToInputs();
    });
  }

  public reversSelects(): void {
    const primary = this.form.value.primarySelectCurrency;
    const secondary = this.form.value.secondarySelectCurrency;
    this.form.controls['primarySelectCurrency'].setValue(secondary);
    this.form.controls['secondarySelectCurrency'].setValue(primary);
    this.setValueOnPrimaryChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
