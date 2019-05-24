import { ReplaySubject } from 'rxjs';

export abstract class ListServiceBase<T> {
  protected items: Array<T> = new Array<T>();
  public all$: ReplaySubject<T[]>

  constructor() {
    this.all$ = new ReplaySubject(1);
  }

  add(item: T): void {
    this.items.push(item);
    this.all$.next(this.items);
  }

  import(json: string): void {
    this.items = JSON.parse(json).map((item) => {
      return this.fromJSON(item);
    }, this)
    this.all$.next(this.items);
  }

  export(): string {
    return JSON.stringify(this.items);
  }

  abstract fromJSON(json: any): T;
}
