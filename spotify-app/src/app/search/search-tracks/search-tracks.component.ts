import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-tracks',
  templateUrl: './search-tracks.component.html',
  styleUrls: ['./search-tracks.component.scss']
})
export class SearchTracksComponent implements OnInit {
  @Input() tracksItems: any;
  constructor() {}

  ngOnInit(): void {}

  @Output() newItemEvent = new EventEmitter<string>();

  @Output() newItemUriEvent = new EventEmitter<string>();

  addNewItemId(id: string) {
    this.newItemEvent.emit(id);
  }

  addItemUri(uri: string) {
    this.newItemUriEvent.emit(uri);
  }
}
