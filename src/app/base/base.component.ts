import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/services/datashare/shared-data.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-basecomponent',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(protected authService: AuthService, protected sharedDataService: SharedDataService) { }

  userInfo : any = null;
  
  ngOnInit(): void {
    this.sharedDataService
      .getObservableData(environment.sharedDataUserKey)
      .subscribe(userInfo => {
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
