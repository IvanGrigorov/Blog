import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(private meta: Meta) { }

  updateSEO(title: string, description: string, url: string) {
    this.updateFBSEO(title, description, url);
    this.updateTwitterSEO(title, description, url);
  }

  private updateTwitterSEO(title: string, description: string, url: string) {
    this.meta.updateTag({ name: 'twitter:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: title })
    this.meta.updateTag({ name: 'twitter:description', content: description })
  }

  private updateFBSEO(title: string, description: string, url: string) {
    this.meta.updateTag({ name: 'og:url', content: url });
    this.meta.updateTag({ name: 'og:title', content: title })
    this.meta.updateTag({ name: 'og:description', content: description })
  }

  updateKeywords(keywords: string) {
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
    else {
      this.meta.updateTag({ name: 'keywords', content: "Ivan, Grigorov, programmer, blog, programming, sport, physics, cosmology, science" });
    }
  }

  resetMetaTags() {
    this.meta.removeTag("name='og:url'");
    this.meta.removeTag("name='og:title'");
    this.meta.removeTag("name='og:description'");
    this.meta.removeTag("name='twitter:url'");
    this.meta.removeTag("name='twitter:title'");
    this.meta.removeTag("name='twitter:description'");
    this.updateKeywords("");
  }

  
}
