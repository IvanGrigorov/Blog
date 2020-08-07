import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/services/article/article.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/Article';
import { map, mergeMap } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  constructor(private articleService: ArticleService,
    private fb: FormBuilder,
    private toatsr: ToastrService,
    private activatedRoute: ActivatedRoute) {
      this._article = fb.group({
        "title" : ['', [Validators.required]],
        "body" : ['', [Validators.required]],
        "createdOn" : ['', [Validators.required]],
        "tags" : ['', [Validators.required]],
      });
  }

  private _article : FormGroup;
  private _formKeys : Array<string> = ['title', 'body', 'createdOn'];
  private _currentArticle : Article;
  private _tagsInput : Array<string>  = [];
  private _tagsTouched : boolean  = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map(params => params['id']),
      mergeMap(id => this.articleService.returnArticle(id))
    ).subscribe(result => {
      this._currentArticle = result;
      this._tagsInput = this._currentArticle.tags.split(',');
      this._article = this.fb.group({
        "title" : [this._currentArticle.title, [Validators.required]],
        "body" : [this._currentArticle.body, [Validators.required]],
        "createdOn" : [this._currentArticle.createdOn, [Validators.required]],
        "tags" : ['', [Validators.required]],
      });
    })
  }

  get tagsInput() {
    return this._tagsInput;
  }


  get article() {
    return this._article;
  }

  get title() {
    return this._article.get('title');
  }

  get body() {
    return this._article.get('body');
  }

  get tags() {
    return this._article.get('tags');
  }

  
  get tagsCount() {
    return this._tagsInput.length;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this._tagsInput.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tags.setValue(null);
  }

  remove(tag: string): void {
    const index = this._tagsInput.indexOf(tag);

    if (index >= 0) {
      this._tagsInput.splice(index, 1);
    }
  }

  private convertFormControllToFormData() : FormData{
    let formData = new FormData();
    formData.append('id', this._currentArticle.id.toString());
    this._formKeys.forEach(key => {
      formData.append(key, this.article.value[key])
    })
    formData.append('tagsJson', this.tagsInput.join(','));
    return formData;
  }


  edit() {
    this.articleService.editArticle(this.convertFormControllToFormData())
      .subscribe(result => {
        this.toatsr.success("Article updated successfuly!", "Success");
      })
  }


}
