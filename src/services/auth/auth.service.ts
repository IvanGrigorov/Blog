import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../app/models/User';
import { SharedDataService } from '../datashare/shared-data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl : string = environment.api + "identity/login";
  private userInfoUrl : string = environment.api + "identity/info"


  constructor(private httpClient: HttpClient, private sharedDataService: SharedDataService) { }

  login(data)  {
    return this.httpClient.post(this.loginUrl, data, { responseType: "text" });
  }

  saveToken(token) {
    localStorage.setItem(environment.tokenLocalStorageHeader, token);
  }

  getToken(token) : string {
    return localStorage.getItem(environment.tokenLocalStorageHeader);
  }
  
  isUserLoggedIn() : boolean {
    return (localStorage.getItem(environment.tokenLocalStorageHeader)) ? true : false;
  }

  getUserData() : Observable<User> {
    return this.httpClient.get<User>(this.userInfoUrl);
  }

  saveUserData() {
    this.sharedDataService.setData(environment.sharedDataUserKey, new BehaviorSubject([]))
    this.getUserData().subscribe(userdata => {
      if (userdata.userName) {
        this.sharedDataService.setObservableData(environment.sharedDataUserKey, userdata);
      } 
    })
  }
}
