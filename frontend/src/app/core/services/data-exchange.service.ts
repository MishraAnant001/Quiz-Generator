import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  private data: any
  setData(receivedData: any) {
    this.data = receivedData
  }
  getData() {
    return this.data
  }
  reset() {
    this.data = undefined
  }
}
