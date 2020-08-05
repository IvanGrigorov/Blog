import { Component, OnInit } from '@angular/core';
import { Project } from '../models/Project';
import { ProjectService } from 'src/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from 'src/services/images/images.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  private project : Project = null;

  constructor(private route: ActivatedRoute, 
    private projectService : ProjectService,
    private imageSerice : ImagesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectService.returnProject(params.id).subscribe(project => 
        this.project = project
      );
    })
  }

  getProjectDetails() : Project {
    return this.project;
  }

  getImage(fileName : string) : string {
    return this.imageSerice.returnImageUrl(fileName);
  }

}
