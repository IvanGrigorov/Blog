import { Component, OnInit } from '@angular/core';
import { Technology } from '../models/Technology';
import { TechnologyService } from 'src/services/technology/technology.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { AuthService } from 'src/services/auth/auth.service';
import { UserinfostoreService } from 'src/services/userinfostoreservice/userinfostore.service';
import { SEOService } from 'src/services/seo/seo.service';

@Component({
  selector: 'app-all-technologies',
  templateUrl: './all-technologies.component.html',
  styleUrls: ['./all-technologies.component.css']
})
export class AllTechnologiesComponent extends BaseComponent implements OnInit {

  private _technologies : Array<Technology> =  [];

  constructor(private technologyService : TechnologyService,
    private toatsr : ToastrService,
    protected router : Router,
    protected authService : AuthService,
    protected userInfoStore : UserinfostoreService,
    private seoService: SEOService) { 
      super(authService, userInfoStore, router)
    }

  ngOnInit(): void {
    this.technologyService.returnAllTechnologies().subscribe(technologies => {
      this._technologies = technologies;
    })
    super.ngOnInit();
    this.seoService.createCanonicalURL();
  }

  getTechnologies() : Array<Technology> {
    return this._technologies;
  }

  getTechnologiesCount() : number {
    return this._technologies.length;
  }

  deleteTechnology(id : string) {
    this.technologyService.deleteTechnology(id).subscribe(result => {
      this.toatsr.success("You have deleted the technology", "Success");
      this.ngOnInit();
    });
  }

  editTechnology(id: string) {
    this.router.navigate(["programming/technology", id, "edit"]);
  }

}
