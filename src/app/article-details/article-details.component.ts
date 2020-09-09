import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/services/article/article.service';
import { ImagesService } from 'src/services/images/images.service';
import { environment } from 'src/environments/environment';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { SEOService } from 'src/services/seo/seo.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  private article : Article = null;
  private _currentUrl;

  constructor(private route: ActivatedRoute, 
    private articleService : ArticleService,
    private imageSerice : ImagesService,
    private router: Router,
    private title: Title,
    private seoService: SEOService,
    private _domSanitizer: DomSanitizer) { 
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleService.returnArticle(params.id).subscribe(article => {
        this.article = article;
        this.title.setTitle(this.article.title);
        this.seoService.updateSEO(this.article.title, this.article.title, environment.clientHost + this.router.url);
        this.seoService.updateKeywords(this.article.tags);
      });
    })
    this.seoService.createCanonicalURL();
    this._currentUrl = environment.clientHost + this.router.url;
  }

  public ngOnDestroy() {
    this.seoService.resetMetaTags();
  }

  get body() {
    return this._domSanitizer.bypassSecurityTrustHtml(this.getArticleDetails()?.body);
  }

  get currentUrl() {
    return this._currentUrl;
  }

  getArticleDetails() : Article {
    return this.article;
  }

  getImage(fileName : string) : string {
    return this.imageSerice.returnImageUrl(fileName);
  }

  get tags() {
    return this.article.tags.split(',')
  }

  get articleDetails() {
    return this.article;
  }

}
