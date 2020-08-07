import { Component, OnInit } from '@angular/core';
import { TechnologyService } from 'src/services/technology/technology.service';
import { ProjectService } from 'src/services/project/project.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Technology } from '../models/Technology';
import { environment } from 'src/environments/environment';
import { Project } from '../models/Project';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  constructor(private technologyService: TechnologyService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toatsr: ToastrService,
    private activatedRoute: ActivatedRoute) {
      this._project = fb.group({
        "title" : ['', [Validators.required]],
        "description" : ['', [Validators.required]],
        "website" : ['', [Validators.required]],
      });
  }

  private _technologiesCreated : Array<Technology> = [];
  private _project : FormGroup;
  private _formKeys : Array<string> = ['title', 'description', 'website'];
  private _technologies : Array<number> = [];
  private _technologiesTouched : boolean = false;
  private _currentProject : Project;



  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map(params => params['id']),
      mergeMap(id => this.projectService.returnProject(id), (paramId, result) => {
        this._currentProject = result;
        this._project = this.fb.group({
          "title" : [this._currentProject.title, [Validators.required]],
          "description" : [this._currentProject.description, [Validators.required]],
          "website" : [this._currentProject.website, [Validators.required]],
        });
      }),
      mergeMap(() => this.technologyService.returnAllTechnologies())
      )
      .subscribe(technologies => { 
        this._technologiesCreated = technologies;
      });
  }

  get technologiesCreated() {
    return this._technologiesCreated;
  }

  get technologiesCreatedCount() {
    return this._technologiesCreated.length;
  }

  get project() {
    return this._project;
  }

  get title() {
    return this._project.get('title');
  }

  get description() {
    return this._project.get('description');
  }

  get technologiesTouched () : boolean {
    return this._technologiesTouched;
  }


  get website() {
    return this._project.get('website');
  }

  getCountOfSelectedTechnologies() : number {
    return this._technologies.length;
  }

  onTechnologyEventChange(event, technology) {
    this._technologiesTouched = true
    if (event.target.checked){
      this._technologies.push(technology.id);
    }
    else {
      const index = this._technologies.indexOf(technology.id);
      if (index > -1) {
        this._technologies.splice(index, 1);
      }
    }
  }

  private convertFormControllToFormData() : FormData{
    let formData = new FormData();
    formData.append('id', this._currentProject.id.toString());
    this._formKeys.forEach(key => {
      formData.append(key, this._project.value[key])
    })
    for (let i = 0; i < this._technologies.length; i++) {
      formData.append('technologies', this._technologies[i].toString());
    }
    return formData;
  }


  edit() {
    this.projectService.editProject(this.convertFormControllToFormData())
      .subscribe(result => {
        this.toatsr.success("Project updated successfuly!", "Success");
      })
  }


}
