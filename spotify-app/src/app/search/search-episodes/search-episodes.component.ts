import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
  
@Component({
  selector: 'app-search-episodes',
  templateUrl: './search-episodes.component.html',
  styleUrls: ['./search-episodes.component.scss']
})
export class SearchEpisodesComponent implements OnInit {
  @Input() episodesItems: any;


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
