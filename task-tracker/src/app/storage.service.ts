import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './models/task.model';

interface Cache { [ key: string ]: BehaviorSubject<any>; }

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private cache: Cache;

  constructor () {
    this.cache = Object.create( null );
  }

  setItem(key: 'dataBase', value: Task[]): BehaviorSubject<Task[]> {
    localStorage.setItem(key, JSON.stringify(value));

    if ( this.cache[key] ) {
      this.cache[key].next( value );
      return this.cache[key];
    }

    return this.cache[key] = new BehaviorSubject( value );
  }

  getItem( key: 'dataBase' ): BehaviorSubject<Task[]> {
    if (this.cache[key]) {
      return this.cache[key];
    } else {
      return this.cache[key] = new BehaviorSubject( JSON.parse( localStorage.getItem(key) ?? '' ) );
    }
  }
}
