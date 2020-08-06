import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Technology } from 'src/app/models/Technology';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private createTechnologyUrl = environment.api + "programming/technology/create"
  private getTechnologiesUrl = environment.api + "programming/technology/getall"

  constructor(private http: HttpClient) { }

  createTechnology(data) {
    return this.http.post(this.createTechnologyUrl, data);
  }

  returnAllTechnologies() : Observable<Array<Technology>> {
    return this.http.get<Array<Technology>>(this.getTechnologiesUrl);
  }}
