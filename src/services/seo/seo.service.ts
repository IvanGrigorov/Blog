import { Injectable, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SEOService {


  constructor(private meta: Meta,
    @Inject(DOCUMENT) private dom) { }

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

  createCanonicalURL() {
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    let exists = this.dom.querySelector("link[rel='canonical']");
    if (exists) {
      exists.setAttribute('href', this.dom.URL);
    }
    else {
      this.dom.head.appendChild(link);
      link.setAttribute('href', this.dom.URL);
    }
 }

  
}
