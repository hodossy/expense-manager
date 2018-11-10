import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDetailComponent } from './expense-detail.component';
import { Expense } from '../../models';

import { IndicatorDirective } from '../../directives';

describe('ExpenseDetailComponent', () => {
  let component: ExpenseDetailComponent;
  let fixture: ComponentFixture<ExpenseDetailComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExpenseDetailComponent,
        IndicatorDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDetailComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show text when no expense is defined', () => {
    expect(compiled.querySelector('span').textContent).toContain('No expense to show!');
  });

  it('should show value with currency', () => {
    component.expense = new Expense(100, 'HUF');
    fixture.detectChanges();
    expect(compiled.querySelector('span').textContent).toContain('Ft100.00');
    component.expense = new Expense(100, 'USD');
    fixture.detectChanges();
    expect(compiled.querySelector('span').textContent).toContain('$100.00');
  });

  it('should discriminate expenses from incomes', () => {
    component.expense = new Expense(100, 'USD');
    fixture.detectChanges();
    expect(compiled.querySelector('span').classList).toContain('em-income');
    component.expense = new Expense(-100, 'USD');
    fixture.detectChanges();
    expect(compiled.querySelector('span').classList).toContain('em-expense');
  });
});
