import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private change :BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false)
  constructor() { }
  setChange(){
    this.change.next(true)
  }
  getChange(){
    return this.change
  }
}
