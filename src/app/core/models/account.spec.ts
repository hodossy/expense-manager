import { Account } from './account';
import { Expense } from './expense';

describe('Account', () => {
  it('should create an instance', () => {
    expect(new Account()).toBeTruthy();
    expect(new Account(1)).toBeTruthy();
    expect(new Account(1, 'Test Account')).toBeTruthy();
    expect(new Account(1, 'Test Account', true)).toBeTruthy();
  });

  it('should not serialize expenses', () => {
    let account = new Account(1, 'Test Account', false);
    expect(JSON.stringify(account))
      .toEqual('{"left":0,"right":1,"lvl":0,"id":1,"name":"Test Account","archived":false}');
  });

  it('should be converted to and from JSON equally', () => {
    let account = new Account();
    expect(Account.fromJSON(JSON.stringify(account))).toEqual(account);
    account = new Account(1);
    expect(Account.fromJSON(JSON.stringify(account))).toEqual(account);
    account = new Account(1, 'Test Account');
    expect(Account.fromJSON(JSON.stringify(account))).toEqual(account);
    account = new Account(1, 'Test Account', true);
  });

  it('should calculate its balance', () => {
    let account = new Account();
    account.expenses = [new Expense(1), new Expense(10), new Expense(-100)];
    expect(account.balance).toEqual(-89);
  });

  it('should show a nested display name', () => {
    let account = new Account(0, 'Account');
    let subAccount = new Account(1, 'Sub-Account')
    account.addChild(subAccount);
    expect(account.displayName).toEqual('Account');
    expect(subAccount.displayName).toEqual('Account > Sub-Account');
  });
});
