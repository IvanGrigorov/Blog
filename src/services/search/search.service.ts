import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/Project';
import { Article } from 'src/app/models/Article';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl;
  private discoveryUrl

  constructor(private http: HttpClient) {
    this.searchUrl = environment.api + "programming/search";
    this.discoveryUrl = environment.api + "hobbies/Discovery/Discover";
  
   }

  searchProgramming(data) : Observable<Array<Project>> {
    return this.http.post<Array<Project>>(this.searchUrl, data)
  }

  searchArticle(data) : Observable<Array<Article>>{
    return this.http.post<Array<Article>>(this.discoveryUrl, data)
  }
}
