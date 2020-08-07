import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { UserinfostoreService } from 'src/services/userinfostoreservice/userinfostore.service';

@Component({
  selector: 'app-basecomponent',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(protected authService: AuthService, protected userInfoStore: UserinfostoreService) { }

  userInfo : any = null;
  
  ngOnInit(): void {
    this.userInfoStore.userInfo$
      .subscribe(userInfo => {
        if (!userInfo.userName) {
          return;
        }
        this.userInfo = userInfo;
      });
  }

  isUserAdmin() : boolean {
    return this.userInfo && this.userInfo.isAdmin;
  }

  isUserLogged() : boolean {
    return this.authService.isUserLoggedIn();
  }

  getUserName() : string {
    if (!this.userInfo) {
      return "";
    }
    return this.userInfo.userName;
  }
}
