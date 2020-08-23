import { Component, OnInit } from '@angular/core';
import {  } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingstateService } from 'src/services/loadingState/loadingstate.service';
import { SEOService } from 'src/services/seo/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  private _loading: boolean = false;
  constructor(private router: Router, private loadingState : LoadingstateService,
    private seoService: SEOService) {
    this.loadingState.loading$.subscribe(result => {
      this._loading = result;
    });
    this.seoService.createCanonicalURL();
   }

  ngOnInit(): void {
    
  }

  get loading() {
    return this._loading;
  }
  
  programmingMode() {
    localStorage.setItem('mode', "programming");
  }

  articleMode() {
    localStorage.setItem('mode', "hobbies");
  }

}
