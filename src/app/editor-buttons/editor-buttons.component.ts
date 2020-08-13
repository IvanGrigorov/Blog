import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-editor-buttons',
  templateUrl: './editor-buttons.component.html',
  styleUrls: ['./editor-buttons.component.css']
})
export class EditorButtonsComponent implements OnInit {

  @Output() contentUpdate = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  h() {
    this.contentUpdate.emit(" <hX>Your Title (Update X)!</hX> ");
  }

  bold() {
    this.contentUpdate.emit(" <b>Your Bold Text</b> ");
  }

  italic() {
    this.contentUpdate.emit(" <i>Your Italic Text</i> ");
  }

  image() {
    this.contentUpdate.emit(' <img src="Your Image Link"/> ');
  }

  link() {
    this.contentUpdate.emit(' <a href="Your Link">Link Text</a> ');
  }

}
