import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AccountService } from '../../core/services';

@Component({
  selector: 'em-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  account$: Observable<Account>;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let account$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getById(params.get('id')))
    );
  }

}
