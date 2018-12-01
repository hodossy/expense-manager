import { Component, Input, OnInit } from '@angular/core';

import { Account } from '../../models';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  @Input() account: Account;

  constructor() { }

  ngOnInit() {
  }

}
