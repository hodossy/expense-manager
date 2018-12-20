import { Injectable } from '@angular/core';
import { Account } from '../models';
import { NodeService } from '../../lib/tree';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends NodeService<Account> {
  fromJSON = Account.fromJSON;

  getById(id: number | string) {
    return this.all$.pipe(
      map((accounts: Account[]) => {
        accounts.find((account: Account) => {
          return account.id === +id;
        })
      })
    );
  }
}
