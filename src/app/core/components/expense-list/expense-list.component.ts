import { Component, OnInit, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Expense } from '../../models';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
  @Input() expenses: Array<Expense>;
  private displayedColumns = ['created', ]
  _showAccount: boolean;
  _showCategory: boolean;

  @Input('noAccount')
  set showAccount(value: boolean) {
    this._showAccount = !value;
  }

  @Input('noCategory')
  set showCategory(value: boolean) {
    this._showCategory = !value;
  }

  constructor() { }

  ngOnInit() {
    if(this._showAccount) {
      this.displayedColumns.push('account');
    }
    if(this._showCategory) {
      this.displayedColumns.push('category');
    }
    this.displayedColumns.push('value');
  }

}
