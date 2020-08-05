import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { 
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
    });
  }

  get userName() {
    return this.loginForm.get("UserName");
  }

  get password() {
    return this.loginForm.get("Password");
  }
}
