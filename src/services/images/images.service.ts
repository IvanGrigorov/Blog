import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor() { }

  returnImageUrl(fileName) : string{
    return environment.api + "images/" + fileName;
  }
}
