import { Injectable } from '@angular/core';
import { Account } from '../models';
import { NodeService } from '../../lib/tree';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends NodeService<Account> {
  fromJSON = Account.fromJSON;

  constructor() {
    super();
    this.setRoot(new Account(0, "Root", false));
  }

  getById(id: number | string): Observable<Account> {
    return this.all$.pipe(
      map((accounts: Account[]): Account => {
        return accounts.find((account: Account) => {
          return account.id === +id;
        })
      }),
      take(1)
    );
  }
}
