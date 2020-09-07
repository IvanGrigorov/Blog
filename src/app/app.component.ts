import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { SEOService } from 'src/services/seo/seo.service';
import { NotificationService } from 'src/services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private authService: AuthService,
    private titleService: Title, 
    private seoService: SEOService,
    private notificationService: NotificationService) {
      this.titleService.setTitle(this.title);
      this.seoService.updateKeywords("");
  }

  ngOnInit(): void {
    this.authService.saveUserData();
    this.notificationService.requestPermision();
  }
  
  title = 'IProgramming | IStuff - Ivan Grigorov\'s Blog';
}
