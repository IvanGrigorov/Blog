import { Component, OnInit } from '@angular/core';
import { TechnologyService } from 'src/services/technology/technology.service';
import { Technology } from '../models/Technology';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/services/project/project.service';
import { environment } from 'src/environments/environment';
import { Helpers } from '../../helpers/helperFunctions';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {


  constructor(private technologyService: TechnologyService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toatsr: ToastrService) {
      this._project = fb.group({
        "title" : ['', [Validators.required]],
        "description" : ['', [Validators.required]],
        "website" : ['', [Validators.required]],
        "createdOn" : ['', [Validators.required]],
      });
  }

  private _technologiesCreated : Array<Technology> = [];
  private _project : FormGroup;
  private _files : Array<any> = [];
  private _formKeys : Array<string> = ['title', 'description', 'website', 'createdOn'];
  private _technologies : Array<number> = [];
  private _technologiesTouched : boolean = false;




  ngOnInit(): void {
    this.technologyService.returnAllTechnologies()
      .subscribe(result => {
        this._technologiesCreated = result;
      })
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

  get imageUploadArray() : Array<any> {
    return new Array(environment.numberOfImagesPerProject);
  }

  addMoreImages() {
    environment.numberOfImagesPerProject++;
  }

  onFileEventChange(event, fileId) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this._files.push(file)
    }
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
    this._formKeys.forEach(key => {
      formData.append(key, this._project.value[key])
    })
    for (let i = 0; i < this._files.length; i++) {
      formData.append('gallery', this._files[i]);
    }
    for (let i = 0; i < this._technologies.length; i++) {
      formData.append('technologies', this._technologies[i].toString());
    }
    return formData;
  }


  create() {
    this._project.value.createdOn = Helpers.getCurrentDate();
    this.projectService.createProject(this.convertFormControllToFormData())
      .subscribe(result => {
        this.toatsr.success("Project created successfuly!", "Success");
      })
  }

}
