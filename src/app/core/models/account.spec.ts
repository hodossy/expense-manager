import { Account } from './account';

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
      .toEqual('{"left":0,"right":1,"id":1,"name":"Test Account","archived":false}');
  });

  it('should be converted to and from JSON equally', () => {
    var expense = new Account();
    expect(Account.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Account(1);
    expect(Account.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Account(1, 'Test Account');
    expect(Account.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Account(1, 'Test Account', true);
  });
});
