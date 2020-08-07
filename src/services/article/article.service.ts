import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private createArticletUrl = environment.api + localStorage.getItem(environment.modeKey) + "/article/create";
  private getArticlesUrl = environment.api + localStorage.getItem(environment.modeKey) + "/article/all";
  private getArticleDetails = environment.api + localStorage.getItem(environment.modeKey) + "/article/"
  private deleteArticleUrl = environment.api + localStorage.getItem(environment.modeKey) + "/article/delete/"
  private updateArticleUrl = environment.api + localStorage.getItem(environment.modeKey) + "/article/update/"



  constructor(private http: HttpClient) { }

  createArticle(data) {
    return this.http.post(this.createArticletUrl, data)
  }

  editArticle(data) {
    return this.http.put(this.updateArticleUrl, data)
  }

  returnArticles() : Observable<Array<Article>> {
    return this.http.get<Array<Article>>(this.getArticlesUrl);
  }

  returnArticle(id : string) : Observable<Article> {
    return this.http.get<Article>(this.getArticleDetails + id);
  }

  deleteArticle(id : string) : Observable<any> {
    return this.http.delete(this.deleteArticleUrl + id);
  }
}
