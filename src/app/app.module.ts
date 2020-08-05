import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgrammingComponent } from './programming/programming.component';
import { HomeComponent } from './home/home.component';
import { PnavigationComponent } from './pnavigation/pnavigation.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from '../services/guards/auth-guard.service';
import { TokenInterceptorService } from '../services/interceptor/token-interceptor.service';
import { ImagesService } from '../services/images/images.service';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { BaseComponent } from './base/base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserinfostoreService } from '../services/userinfostoreservice/userinfostore.service';



@NgModule({
  declarations: [
    AppComponent,
    ProgrammingComponent,
    HomeComponent,
    PnavigationComponent,
    LoginComponent,
    ProjectDetailsComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ImagesService,
    UserinfostoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
