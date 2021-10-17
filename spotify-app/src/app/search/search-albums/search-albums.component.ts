import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-albums',
  templateUrl: './search-albums.component.html',
  styleUrls: ['./search-albums.component.scss']
})
export class SearchAlbumsComponent implements OnInit {
  @Input() albumsItems: any;
  constructor() {}

  ngOnInit(): void {}
}
