import { Component, OnInit } from '@angular/core';
import { ProjectService} from '../../services/project/project.service';
import { Project } from '../models/Project';
import { AuthService } from 'src/services/auth/auth.service';
import { BaseComponent } from '../base/base.component';
import { ToastrService } from 'ngx-toastr';
import { UserinfostoreService } from 'src/services/userinfostoreservice/userinfostore.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html',
  styleUrls: ['./programming.component.css']
})
export class ProgrammingComponent extends BaseComponent implements OnInit {

  private projects : Array<Project> = [];

  constructor(private projectService: ProjectService, 
    protected authService: AuthService, 
    protected userInfoStore: UserinfostoreService,
    private toastr: ToastrService,
    private router: Router) { 
    super(authService, userInfoStore);
   }

  ngOnInit(): void {
    this.projectService.returnProjects().subscribe(projectArray => {
      this.projects = projectArray;
    })
    super.ngOnInit();
  }

  getProjects() : Array<Project> {
    return this.projects;
  }

  getProjectsCount() : number {
    return this.projects.length;
  }

  deleteProject(id : string) {
    this.projectService.deleteProject(id).subscribe(result => {
      this.toastr.success("You have deleted the project", "Success");
      this.ngOnInit();
    });
  }

  editProject(id: string) {
    this.router.navigate(["programming/project", id, "edit"]);
  }

  update(eventData) {
    this.projects = eventData;
  }

}
