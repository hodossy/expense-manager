import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

import { AccountPageComponent } from './account-page.component';
import { CoreModule } from '../../core/core.module';

describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageComponent ],
      imports: [
        FlexLayoutModule,
        MatDividerModule,
        CoreModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {paramMap : of(convertToParamMap({id: 0}))}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
