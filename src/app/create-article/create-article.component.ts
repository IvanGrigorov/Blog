import { Component, OnInit, ElementRef } from '@angular/core';
import { ArticleService } from 'src/services/article/article.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Helpers } from '../../helpers/helperFunctions';
import { NotificationService } from 'src/services/notification/notification.service';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private articleService: ArticleService,
    private fb: FormBuilder,
    private toatsr: ToastrService,
    private notificationService: NotificationService) {
      this._article = fb.group({
        "title" : ['', [Validators.required]],
        "body" : ['', [Validators.required]],
        "createdOn" : ['', [Validators.required]],
        "tags" : ['', [Validators.required]],
      });
  }

  private selectionIndex = 0;
  private previewMode = false;
  private _article : FormGroup;
  private _files : Array<any> = [];
  private _formKeys : Array<string> = ['title', 'body', 'createdOn'];
  private _tagsInput : Array<string>  = [];
  private _tagsTouched : boolean  = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];



  ngOnInit(): void {
  }

  get preview() {
    return this.previewMode;
  }

  set preview(value) {
    this.previewMode = value;
  }

  get tagsInput() {
    return this._tagsInput;
  }

  get tagsCount() {
    return this._tagsInput.length;
  }

  get tags() {
    return this._article.get('tags');
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

  get imageUploadArray() : Array<any> {
    return new Array(environment.numberOfImagesPerArticle);
  }

  addMoreImages() {
    environment.numberOfImagesPerArticle++;
  }

  onFileEventChange(event, fileId) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this._files.push(file)
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tagsInput.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tags.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tagsInput.indexOf(tag);

    if (index >= 0) {
      this.tagsInput.splice(index, 1);
    }
  }

  private convertFormControllToFormData() : FormData{
    let formData = new FormData();
    this._formKeys.forEach(key => {
      formData.append(key, this._article.value[key])
    })
    for (let i = 0; i < this._files.length; i++) {
      formData.append('gallery', this._files[i]);
    }
    formData.append('tagsJson', this.tagsInput.join(','));
    return formData;
  }

  change(event) {
    this.selectionIndex = event.target.selectionStart;
  }

  updateBody(eventData) {
    this._article.get("body").setValue(this.body.value.substring(0, this.selectionIndex) + eventData + this.body.value.substring(this.selectionIndex));
    this.selectionIndex = 0;
  }

  enablePreview() {
    this.preview = true;
  }

  clear() {
    this.preview = false;
  }


  create() {
    this._article.value.createdOn = Helpers.getCurrentDate();
    this.articleService.createArticle(this.convertFormControllToFormData())
      .subscribe(result => {
        this.toatsr.success("Article created successfuly!", "Success");
        this.notificationService.createNotification(
          'https://ivanit.eu/assets/images/hobbies/article.jpg',
          'New article created !',
          'Hi, a new article is created !',
          'https://ivanit.eu/hobbies/article/' + result
        )
      })
  }

}
