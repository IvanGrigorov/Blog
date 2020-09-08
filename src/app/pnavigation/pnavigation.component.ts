import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BaseComponent } from '../base/base.component';
import { UserinfostoreService } from 'src/services/userinfostoreservice/userinfostore.service';
import { SearchService } from 'src/services/search/search.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingstateService } from 'src/services/loadingState/loadingstate.service';
import anime from 'animejs';

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
    protected loadingState: LoadingstateService) {
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
    this.createAnimation();
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

   createAnimation() {
    anime.timeline({loop: false})
    .add({
      targets: '.ml5 .line',
      opacity: [0.5,1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 700
    }).add({
      targets: '.ml5 .line',
      duration: 600,
      easing: "easeOutExpo",
      translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
    }).add({
      targets: '.ml5 .ampersand',
      opacity: [0,1],
      scaleY: [0.5, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5 .letters-left',
      opacity: [0,1],
      translateX: ["0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=300'
    }).add({
      targets: '.ml5 .letters-right',
      opacity: [0,1],
      translateX: ["-0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5',
      opacity: 1,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
   }

}
