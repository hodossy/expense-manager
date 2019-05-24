import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Account, Expense } from '../../core/models';
import { AccountService, ExpenseService } from '../../core/services';

@Component({
  selector: 'em-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  account$: Observable<Account>;
  expenses$: Observable<Expense[]>;

  constructor(
    private accountService: AccountService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.account$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.accountService.getById(params.get('id')))
    );
    this.expenses$ = this.account$.pipe(
      switchMap((account: Account): Observable<Expense[]> => {
        return this.expenseService.getExpensesForAccount$(account);
      })
    )
  }

}
