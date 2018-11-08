import { Injectable } from '@angular/core';
import { Account } from '../models';
import { NodeService } from './node.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends NodeService<Account> {
  fromJSON = Account.fromJSON;
}