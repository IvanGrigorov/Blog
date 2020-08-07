import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public errorMsg : string = "Ressource not found !"; 

  constructor(private router: Router) { 
    this.errorMsg = this.router.getCurrentNavigation().extras.state?.errorMsg || this.errorMsg;
  }

  ngOnInit(): void {
  }

}
