import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TechnologyService } from '../../services/technology/technology.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-technology',
  templateUrl: './create-technology.component.html',
  styleUrls: ['./create-technology.component.css']
})
export class CreateTechnologyComponent implements OnInit {

  technology : FormGroup;

  constructor(private fb: FormBuilder, 
    private technologyService: TechnologyService,
    private toatsr: ToastrService,
    private router: Router) { 
    this.technology = fb.group({
      "title" : ['', [Validators.required]],
      "description" : ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  get title() {
    return this.technology.get("title");
  }

  get description() {
    return this.technology.get("description");
  }

  create() {
    this.technologyService.createTechnology(this.technology.value)
      .subscribe(result => {
        this.toatsr.success("You have successfuly created a technology", "Success");
      })
  }

  goToTechnologies() {
    this.router.navigate(["technologies/all"]);
  }

}
