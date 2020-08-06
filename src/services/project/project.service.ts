import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../../app/models/Project';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private createProjectUrl = environment.api + "programming/project/create";
  private getProjectsUrl = environment.api + "programming/project/getall";
  private getProjectDetails = environment.api + "programming/project/"
  private deleteProjectUrl = environment.api + "programming/project/delete/"


  constructor(private http: HttpClient) { }

  createProject(data) {
    return this.http.post(this.createProjectUrl, data)
  }

  returnProjects() : Observable<Array<Project>> {
    return this.http.get<Array<Project>>(this.getProjectsUrl);
  }

  returnProject(id : string) : Observable<Project> {
    return this.http.get<Project>(this.getProjectDetails + id);
  }

  deleteProject(id : string) : Observable<any> {
    return this.http.delete(this.deleteProjectUrl + id);
  }
}
