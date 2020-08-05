import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BaseComponent } from '../base/base.component';
import { UserinfostoreService } from 'src/services/userinfostoreservice/userinfostore.service';

@Component({
  selector: 'app-pnavigation',
  templateUrl: './pnavigation.component.html',
  styleUrls: ['./pnavigation.component.css']
})
export class PnavigationComponent extends BaseComponent implements OnInit {

  userInfo : any = null;
  constructor(protected authService: AuthService, protected userInfoStore: UserinfostoreService) {
    super(authService, userInfoStore);
   }

   ngOnInit() {
    super.ngOnInit();
   }

}
