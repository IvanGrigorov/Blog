import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ArticleService } from 'src/services/article/article.service';
import { AuthService } from 'src/services/auth/auth.service';
import { UserinfostoreService } from 'src/services/userinfostoreservice/userinfostore.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Article } from '../models/Article';
import { SEOService } from 'src/services/seo/seo.service';
import { SearchService } from 'src/services/search/search.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent extends BaseComponent implements OnInit {


  private articles : Array<Article> = [];

  constructor(private articlesService: ArticleService, 
    protected authService: AuthService, 
    protected userInfoStore: UserinfostoreService,
    private toastr: ToastrService,
    protected router: Router,
    private seoService: SEOService,
    private searchService: SearchService) { 
    super(authService, userInfoStore, router);
    localStorage.setItem('mode', "hobbies");
   }

  ngOnInit(): void {
    this.articlesService.returnArticles().subscribe(articlesArray => {
      this.articles = articlesArray;
    })
    super.ngOnInit();
    this.seoService.createCanonicalURL();
  }

  getArticles() : Array<Article> {
    return this.articles;
  }

  getArticlesCount() : number {
    return this.articles.length;
  }

  deleteArticles(id : string) {
    this.articlesService.deleteArticle(id).subscribe(result => {
      this.toastr.success("You have deleted the article", "Success");
      this.ngOnInit();
    });
  }

  editArticle(id: string) {
    this.router.navigate(["hobbies/article", id, "edit"]);
  }

  update(eventData) {
    this.articles = eventData;
  }

  quickSearch(query) {
    this.searchService.searchArticle({query: query})
        .subscribe(articles => this.articles = articles)
  }


}
