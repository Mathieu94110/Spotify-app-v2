import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-tracks',
  templateUrl: './search-tracks.component.html',
  styleUrls: ['./search-tracks.component.scss']
})
export class SearchTracksComponent implements OnInit {
  @Input() tracksItems: any;
  constructor() {}

  ngOnInit(): void {}
}
