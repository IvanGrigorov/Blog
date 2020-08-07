import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
