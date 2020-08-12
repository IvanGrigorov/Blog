import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Technology } from 'src/app/models/Technology';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private section = "programming";
  private createTechnologyUrl = environment.api + this.section + "/technology/create";
  private getTechnologiesUrl = environment.api + this.section + "/technology/getall";
  private deleteTechnologiesUrl = environment.api + this.section + "/technology/delete/";
  private getTechnologyUrl = environment.api + this.section + "/technology/";
  private updateTechnologyUrl = environment.api + this.section + "/technology/update"



  constructor(private http: HttpClient) { }

  createTechnology(data) {
    return this.http.post(this.createTechnologyUrl, data);
  }

  returnTechnology(id) : Observable<Technology>{
    return this.http.get<Technology>(this.getTechnologyUrl + id);
  }

  returnAllTechnologies() : Observable<Array<Technology>> {
    return this.http.get<Array<Technology>>(this.getTechnologiesUrl);
  }

  deleteTechnology(id) {
    return this.http.delete(this.deleteTechnologiesUrl + id);
  }

  updateTechnology(data) {
    return this.http.put(this.updateTechnologyUrl, data);
  }
}
