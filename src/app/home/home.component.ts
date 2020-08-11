import { Component, OnInit } from '@angular/core';
import {  } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingstateService } from 'src/services/loadingState/loadingstate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  private _loading: boolean = true;
  constructor(private router: Router, private loadingState : LoadingstateService) {
    this.loadingState.loading$.subscribe(result => {
      this._loading = result;
    })
   }

  ngOnInit(): void {
    
  }

  get loading() {
    return this._loading;
  }
  
  programmingMode() {
    localStorage.setItem('mode', "programming");
    this.navigate();
  }

  articleMode() {
    localStorage.setItem('mode', "hobbies");
    this.navigate();
  }

  private navigate() {
    this.router.navigate([localStorage.getItem(environment.modeKey)]);
  }
}
