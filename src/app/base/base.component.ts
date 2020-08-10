import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { UserinfostoreService } from 'src/services/userinfostoreservice/userinfostore.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basecomponent',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(protected authService: AuthService, protected userInfoStore: UserinfostoreService,
    protected router: Router) { }

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

  getMode() {
    let mode = this.router.url.split('/')[1];
    if (mode != "progrmming" && mode != "hobbies") {
      mode = (localStorage.getItem(environment.modeKey)) ? localStorage.getItem(environment.modeKey) : 'home' ;
    }
    return mode;
  }
}
