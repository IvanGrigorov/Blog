import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private authService: AuthService,
    private titleService: Title) {
      this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.authService.saveUserData();
  }
  
  title = 'IProgramming | IStuff';
}
