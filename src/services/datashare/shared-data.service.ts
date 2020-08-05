import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';

import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  data : object = { };
  constructor() { }

  setObservableData(key: string, data: any) : void {
    this.data[key].pipe(
      take(2),
      map(obsData => obsData = data)
    ).subscribe(resp => this.data[key].next(resp));
  }

  setData(key: string, data: any) : void {
    this.data[key] = data;
  }

  getData(key: string) : any {
    return this.data[key];
  }

  getObservableData(key: string) : Observable<any> {
    return this.data[key];
  }

}
