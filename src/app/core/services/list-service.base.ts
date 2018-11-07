export abstract class ListServiceBase<T> {
  protected items: Array<T> = new Array<T>();

  get all(): Array<T> {
    return this.items;
  }

  add(item: T): void {
    this.items.push(item);
  }

  import(json: string): void {
    this.items = JSON.parse(json).map((item) => {
      return this.fromJSON(item);
    }, this)
  }

  export(): string {
    return JSON.stringify(this.all);
  }

  abstract fromJSON(json: any): T;
}
