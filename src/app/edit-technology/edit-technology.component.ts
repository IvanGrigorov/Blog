import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TechnologyService } from 'src/services/technology/technology.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Technology } from '../models/Technology';

@Component({
  selector: 'app-edit-technology',
  templateUrl: './edit-technology.component.html',
  styleUrls: ['./edit-technology.component.css']
})
export class EditTechnologyComponent implements OnInit {

  private _technology : FormGroup;
  private _currentTechnology : Technology = null;

  constructor(private fb: FormBuilder, 
    private technologyService: TechnologyService,
    private toatsr: ToastrService,
    private activatedRoute : ActivatedRoute) { 
    this._technology = fb.group({
      "title" : ['', [Validators.required]],
      "description" : ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map(params => params['id']),
      mergeMap(id => this.technologyService.returnTechnology(id)),
      )
      .subscribe(technology => { 
        this._currentTechnology = technology;
        this._technology = this.fb.group({
          "title" : [this._currentTechnology.title, [Validators.required]],
          "description" : [this._currentTechnology.description, [Validators.required]],
          "id" : [this._currentTechnology.id, [Validators.required]],
        });
      });
  }

  get technology() {
    return this._technology;
  }

  waitForTechnologyToWait() {
    if (this._currentTechnology) {
      return true;
    }
    return false;
  }

  get title() {
    return this.technology.get("title");
  }

  get description() {
    return this.technology.get("description");
  }

  edit() {
    this.technologyService.updateTechnology(this.technology.value)
      .subscribe(result => {
        this.toatsr.success("You have successfuly updated the technology", "Success !");
      })
  }


}
