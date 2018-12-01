import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { ExpenseListComponent } from './expense-list.component';
import { Account, Category, Expense } from '../../models';

@Component({
  selector: 'app-test-host-no',
  template: `
    <app-expense-list [expenses]="expenses" noAccount noCategory>
    </app-expense-list>`,
  styles: ['']
})
class TestHostNoComponent {
  account: Account = new Account(1, 'Test Account');
  category: Category = new Category(1, 'Test Category');
  expenses: Array<Expense> = [
    new Expense(1, 'USD', new Date(), this.account, this.category),
    new Expense(10, 'USD', new Date(), this.account, this.category),
    new Expense(100, 'USD', new Date(), this.account, this.category),
    new Expense(1000, 'USD', new Date(), this.account, this.category),
    new Expense(10000, 'USD', new Date(), this.account, this.category),
  ];
}

@Component({
  selector: 'app-test-host',
  template: `
    <app-expense-list [expenses]="expenses">
    </app-expense-list>`,
  styles: ['']
})
class TestHostComponent extends TestHostNoComponent {}

describe('ExpenseListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ ExpenseListComponent, TestHostComponent, TestHostNoComponent ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    let fixture = TestBed.createComponent(ExpenseListComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render all expenses', () => {
    let testHostFixture = TestBed.createComponent(TestHostComponent);
    let testHostCompiled = testHostFixture.debugElement.nativeElement;
    testHostFixture.detectChanges();
    expect(testHostCompiled.querySelectorAll('tbody > tr').length).toEqual(5);
  });

  it('should render all columns by default', () => {
    let testHostFixture = TestBed.createComponent(TestHostComponent);
    let testHostCompiled = testHostFixture.debugElement.nativeElement;
    testHostFixture.detectChanges();
    expect(testHostCompiled.querySelectorAll('th').length).toEqual(4);
  });

  it('should not render account or category if not required', () => {
    let testHostFixture = TestBed.createComponent(TestHostNoComponent);
    let testHostCompiled = testHostFixture.debugElement.nativeElement;
    testHostFixture.detectChanges();
    expect(testHostCompiled.querySelectorAll('th').length).toEqual(2);
  });
});
