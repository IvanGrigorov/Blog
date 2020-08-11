import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LodingstateService {

  constructor() { }

  private _loading = new BehaviorSubject<boolean>(true);

  public readonly loading$ = this._loading.asObservable();

  get loading() {
    return this._loading.getValue();
  }

  set loading(value: boolean) {
    this._loading.next(value);
  }

  changeLoading(value: boolean) {
    this.loading = value;
  }
}
