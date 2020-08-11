import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BaseComponent } from '../base/base.component';
import { UserinfostoreService } from 'src/services/userinfostoreservice/userinfostore.service';
import { SearchService } from 'src/services/search/search.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LodingstateService } from 'src/services/loadingState/lodingstate.service';

@Component({
  selector: 'app-pnavigation',
  templateUrl: './pnavigation.component.html',
  styleUrls: ['./pnavigation.component.css']
})
export class PnavigationComponent extends BaseComponent implements OnInit {

  userInfo : any = null;
  private _formQuery : FormGroup;
  private _loading: boolean = true;

  @Output() updateResults = new EventEmitter<Array<any>>();

  constructor(protected authService: AuthService,
    protected userInfoStore: UserinfostoreService,
    private searchService: SearchService,
    private fb : FormBuilder,
    protected router: Router,
    protected loadingState: LodingstateService) {
      super(authService, userInfoStore, router);
      this._formQuery = fb.group({
        "query" : ['', [Validators.required]],
      });
      this.loadingState.loading$.subscribe(result => {
        this._loading = result;
      })
   }

   ngOnInit() {
    super.ngOnInit();
   }

   get loading() {
     return this._loading;
   }

   get formQuery() {
     return this._formQuery;
   }

   get query() {
    return this._formQuery.get('query');
  }

  logOut() {
    this.authService.removeToken();
  }


   search() {
    let data = this._formQuery.value;
    if (localStorage.getItem(environment.modeKey) == "programming") {
      this.searchService.searchProgramming(data)
        .subscribe(projects => this.updateResults.emit(projects))
    }
    else {
      this.searchService.searchArticle(data)
        .subscribe(articles => this.updateResults.emit(articles))
    }
   }

}
