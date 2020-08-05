import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserinfostoreService {

  constructor() { }

  private defaultUser : User = {
    userName: "",
    isAdmin: false
  }

  private _userInfo = new BehaviorSubject<User>(this.defaultUser);

  public readonly userInfo$ = this._userInfo.asObservable();

  get userInfo() {
    return this._userInfo.getValue();
  }

  set userInfo(value: User) {
    this._userInfo.next(value);
  }

  addNewUser(value: User) {
    this.userInfo = {...value};
  } 

  removeUser() {
    this.userInfo = this.defaultUser;
  }
}
