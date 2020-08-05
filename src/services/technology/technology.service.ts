import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private createTechnologyUrl = environment.api + "/programming/technology/create"
  private getTechnologiesUrl = environment.api + "/programming/technology/getall"

  constructor(private http: HttpClient) { }

  createTechnology(data) {
    return this.http.post(this.createTechnologyUrl, data);
  }

  returnAllTechnologies() {
    return this.http.get(this.getTechnologiesUrl);
  }}
