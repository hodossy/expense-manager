import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[emIndicator]'
})
export class IndicatorDirective {
  @Input('emIndicator') value: number;

  @HostBinding('class.em-income')
  get isIncome() {
    return this.value > 0;
  }

  @HostBinding('class.em-expense')
  get isExpense() {
    return this.value <= 0;
  }

}
