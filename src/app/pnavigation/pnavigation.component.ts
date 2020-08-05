import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/datashare/shared-data.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-pnavigation',
  templateUrl: './pnavigation.component.html',
  styleUrls: ['./pnavigation.component.css']
})
export class PnavigationComponent extends BaseComponent implements OnInit {

  userInfo : any = null;
  constructor(protected authService: AuthService, protected sharedDataService: SharedDataService) {
    super(authService, sharedDataService);
   }

   ngOnInit() {
    super.ngOnInit();
   }

}
