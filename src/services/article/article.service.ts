import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private section = "hobbies";
  private createArticletUrl = environment.api + this.section + "/article/create";
  private getArticlesUrl = environment.api + this.section  + "/article/all";
  private getArticleDetails = environment.api + this.section + "/article/"
  private deleteArticleUrl = environment.api + this.section  + "/article/delete/"
  private updateArticleUrl = environment.api + this.section + "/article/update/"



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
