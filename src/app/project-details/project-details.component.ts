import { Component, OnInit } from '@angular/core';
import { Project } from '../models/Project';
import { ProjectService } from 'src/services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from 'src/services/images/images.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { SEOService } from 'src/services/seo/seo.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  private project : Project = null;
  private _currentUrl;

  constructor(private route: ActivatedRoute, 
    private projectService : ProjectService,
    private imageSerice : ImagesService,
    private router: Router,
    private title: Title,
    private seoService: SEOService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectService.returnProject(params.id).subscribe(project => {
        this.project = project;
        this.title.setTitle(this.project.title);
        this.seoService.updateSEO(this.project.title, this.project.title, environment.clientHost + this.router.url);
        this.seoService.updateKeywords(this.project.title);
      });
    })
    this._currentUrl = environment.clientHost + this.router.url;
  }

  public ngOnDestroy() {
    this.seoService.resetMetaTags();
  }

  get currentUrl() {
    return this._currentUrl;
  }

  getProjectDetails() : Project {
    return this.project;
  }

  getImage(fileName : string) : string {
    return this.imageSerice.returnImageUrl(fileName);
  }

}
