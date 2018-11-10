import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorDirective } from './indicator.directive';

@Component({
  template: `<span class="other" [emIndicator]="value">Some text</span>`
})
class TestEmIndicatorComponent {
  public value: number = 0;
}

describe('IndicatorDirective', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestEmIndicatorComponent, IndicatorDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  });

  it('should create an instance', () => {
    const directive = new IndicatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should preserve other class as well', ()=> {
    let fixture = TestBed.createComponent(TestEmIndicatorComponent);
    fixture.componentInstance.value = 10;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').classList).toContain('other');
  });

  it('should add em-income class to positive values', ()=> {
    let fixture = TestBed.createComponent(TestEmIndicatorComponent);
    fixture.componentInstance.value = 10;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').classList).toContain('em-income');
  });

  it('should add em-expense class to non-positive values', ()=> {
    let fixture = TestBed.createComponent(TestEmIndicatorComponent);
    fixture.componentInstance.value = -10;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').classList).toContain('em-expense');
  });
});
