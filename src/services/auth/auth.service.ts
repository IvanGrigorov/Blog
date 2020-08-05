import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../app/models/User';
import { UserinfostoreService } from '../userinfostoreservice/userinfostore.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl : string = environment.api + "identity/login";
  private userInfoUrl : string = environment.api + "identity/info"


  constructor(private httpClient: HttpClient, 
    private userStoreService: UserinfostoreService) { }

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
    this.getUserData().subscribe(userdata => {
      if (userdata.userName) {
        this.userStoreService.addNewUser(userdata);
      } 
    })
  }
}
