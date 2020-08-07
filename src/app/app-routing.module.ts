import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgrammingComponent } from './programming/programming.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CreateTechnologyComponent } from './create-technology/create-technology.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AllTechnologiesComponent } from './all-technologies/all-technologies.component';
import { EditTechnologyComponent } from './edit-technology/edit-technology.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ErrorComponent } from './error/error.component';
import { InfoComponent } from './info/info.component';







import { AuthGuardService } from 'src/services/guards/auth-guard.service';





const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'programming', component: ProgrammingComponent },
  { path: 'hobbies', component: ArticlesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'programming/project/:id', component: ProjectDetailsComponent },
  { path: 'hobbies/article/:id', component: ArticleDetailsComponent },
  { path: 'technology/create', component: CreateTechnologyComponent, canActivate: [AuthGuardService] },
  { path: 'project/create', component: CreateProjectComponent, canActivate: [AuthGuardService] },
  { path: 'programming/project/:id/edit', component: EditProjectComponent, canActivate: [AuthGuardService]},
  { path: 'technologies/all', component: AllTechnologiesComponent, canActivate: [AuthGuardService] },
  { path: 'programming/technology/:id/edit', component: EditTechnologyComponent, canActivate: [AuthGuardService]},
  { path: 'hobbies/article/:id/edit', component: EditArticleComponent, canActivate: [AuthGuardService]},
  { path: 'article/create', component: CreateArticleComponent, canActivate: [AuthGuardService]},
  { path: 'info', component: InfoComponent},
  { path: '**', component: ErrorComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
