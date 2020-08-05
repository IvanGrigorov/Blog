import { Component, OnInit } from '@angular/core';
import { ProjectService} from '../../services/project/project.service';
import { Project } from '../models/Project';
import { AuthService } from 'src/services/auth/auth.service';
import { SharedDataService } from 'src/services/datashare/shared-data.service';
import { BaseComponent } from '../base/base.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html',
  styleUrls: ['./programming.component.css']
})
export class ProgrammingComponent extends BaseComponent implements OnInit {

  private projects : Array<Project> = [];

  constructor(private projectService: ProjectService, 
    protected authService: AuthService, 
    protected sharedDataService: SharedDataService,
    private toastr: ToastrService) { 
    super(authService, sharedDataService);
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

}
