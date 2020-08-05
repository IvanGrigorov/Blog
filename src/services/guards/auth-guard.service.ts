import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private routing : Router) { }

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    this.routing.navigate(["login"])
  }
}
