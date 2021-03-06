import { Injectable } from '@angular/core';
import { Category } from '../models';
import { NodeService } from '../../lib/tree';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends NodeService<Category> {
  fromJSON = Category.fromJSON;

  constructor() {
    super();
    this.setRoot(new Category(0, "Root"));
  }

  getById(id: number | string): Observable<Category> {
    return this.all$.pipe(
      map((accounts: Category[]): Category => {
        return accounts.find((account: Category) => {
          return account.id === +id;
        })
      }),
      take(1)
    );
  }
}
