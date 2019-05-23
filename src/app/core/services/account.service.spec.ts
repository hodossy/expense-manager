import { TestBed } from '@angular/core/testing';
import { forkJoin } from 'rxjs';

import { Account } from '../models';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let rootAccount: Account;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AccountService);
    rootAccount = new Account(1);
    rootAccount.addChild(new Account(2, 'Test Account'));
    rootAccount.addChild(new Account(3, 'Test Account', true));
    service.setRoot(rootAccount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should export the accounts to JSON', () => {
    expect(service.export()).toEqual(
      '[{"left":0,"right":5,"lvl":0,"id":1},' +
      '{"left":3,"right":4,"lvl":1,"id":2,"name":"Test Account"},' +
      '{"left":1,"right":2,"lvl":1,"id":3,"name":"Test Account","archived":true}]'
    );
  });

  it('should import accounts from JSON', () => {
    let new_service = new AccountService();
    new_service.import(service.export());
    forkJoin([new_service.all$, service.all$]).subscribe((result) => {
      expect(result[0]).toEqual(result[1]);
    });
  });

  it('should have a root Account if nothing is imported', () => {
    let new_service = new AccountService();
    new_service.import("[]");
    new_service.all$.subscribe((result) => {
      expect(result.length).toEqual(0);
      expect(result[0].id).toEqual(0);
    });
  });
});
