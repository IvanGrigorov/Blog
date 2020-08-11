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
import { ErrorInterceptorService } from '../services/errorInterceptor/error-interceptor.service';
import { ImagesService } from '../services/images/images.service';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { BaseComponent } from './base/base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserinfostoreService } from '../services/userinfostoreservice/userinfostore.service';
import { SearchService } from '../services/search/search.service';
import { CreateTechnologyComponent } from './create-technology/create-technology.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AllTechnologiesComponent } from './all-technologies/all-technologies.component';
import { EditTechnologyComponent } from './edit-technology/edit-technology.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleService } from './../services/article/article.service';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ErrorComponent } from './error/error.component';
import { InfoComponent } from './info/info.component';
import { LoadingComponent } from './loading/loading.component';
import { HttploadinginterceptorService } from '../services/htmlLoadingInterceptor/httploadinginterceptor.service';
import { LoadingstateService } from '../services/loadingState/loadingstate.service';






@NgModule({
  declarations: [
    AppComponent,
    ProgrammingComponent,
    HomeComponent,
    PnavigationComponent,
    LoginComponent,
    ProjectDetailsComponent,
    BaseComponent,
    CreateTechnologyComponent,
    CreateProjectComponent,
    EditProjectComponent,
    AllTechnologiesComponent,
    EditTechnologyComponent,
    ArticlesComponent,
    EditArticleComponent,
    CreateArticleComponent,
    ArticleDetailsComponent,
    ErrorComponent,
    InfoComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    ToastrModule.forRoot(),
    MatChipsModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ImagesService,
    UserinfostoreService,
    SearchService,
    ArticleService,
    LoadingstateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttploadinginterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
