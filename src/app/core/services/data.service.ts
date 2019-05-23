import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  abstract get(token: string): Observable<any>
  abstract set(token:string, data: any): void
}

@Injectable({
  providedIn: 'root'
})
export class LocalDataService implements DataService {

  constructor() {}

  get(token: string): Observable<string> {
    let value: string = localStorage.getItem(token)
    return value && value !== "null" ? of(value) : of("[]");
  }

  set(token: string, data: string): void {
    localStorage.setItem(token, data);
  }
}
