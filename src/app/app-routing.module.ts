import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgrammingComponent } from './programming/programming.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'programming', component: ProgrammingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'programming/project/:id', component: ProjectDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
