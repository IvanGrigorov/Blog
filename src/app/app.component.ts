import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { SEOService } from 'src/services/seo/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private authService: AuthService,
    private titleService: Title, 
    private seoService: SEOService) {
      this.titleService.setTitle(this.title);
      this.seoService.updateKeywords("");
  }

  ngOnInit(): void {
    this.authService.saveUserData();
  }
  
  title = 'IProgramming | IStuff';
}
