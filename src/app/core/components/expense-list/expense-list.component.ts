import { Component, OnInit, Input } from '@angular/core';

import { Expense } from '../../models';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
  @Input() expenses: Array<Expense>;
  private displayedColumns = ['created', 'account', 'category', 'value']

  @Input('noAccount')
  set showAccount(value: string) {
    console.log('showAccount called!')
    let idx = this.displayedColumns.indexOf('account');
    if( -1 !== idx) {
      this.displayedColumns.splice(idx, 1);
    }
    console.log(this.displayedColumns);
  }

  @Input('noCategory')
  set showCategory(value: string) {
    console.log('showCategory called!')
    let idx = this.displayedColumns.indexOf('category');
    if( -1 !== idx) {
      this.displayedColumns.splice(idx, 1);
    }
    console.log(this.displayedColumns);
  }

  constructor() { }

  ngOnInit() {
  }

}
