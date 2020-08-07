import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private fb: FormBuilder,
     private authService: AuthService,
     private router: Router,
     private toastr: ToastrService) { 
    this.loginForm = fb.group({
      "UserName" : ['', [Validators.required]],
      "Password" : ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.authService.saveToken(data);
      this.authService.saveUserData();
      this.router.navigate(['home']);
      this.toastr.success("You have loged in successfully !", "Success")
    });
  }

  get userName() {
    return this.loginForm.get("UserName");
  }

  get password() {
    return this.loginForm.get("Password");
  }
}
