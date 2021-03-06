import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Account, Category, Expense } from '../../models';
import { AccountService, CategoryService, ExpenseService } from '../../services';
import { EM_SUPPORTED_CURRENCIES } from '../../injection-tokens';

@Component({
  selector: 'em-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent {
  @Input("selectedAccount") selectedAccount: Account;
  @Input("selectedCategory") selectedCategory: Category;
  @Input("selectedCurrency") selectedCurrency: string;

  constructor(public dialog: MatDialog, public service: ExpenseService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '300px',
      data: new Expense(
        undefined,
        this.selectedCurrency,
        undefined,
        this.selectedAccount,
        this.selectedCategory
      )
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.service.add(result);
      }
    });
  }

}

@Component({
  selector: 'em-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss']
})
export class AddExpenseDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    public accountService: AccountService,
    public categoryService: CategoryService,
    @Inject(EM_SUPPORTED_CURRENCIES) public currencies: string[],
    @Inject(MAT_DIALOG_DATA) public data: Expense) {}

  ngOnInit(): void {
    this.data.currency = this.data.currency || this.currencies[0];
  }

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }

}
