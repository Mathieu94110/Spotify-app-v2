import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-episodes',
  templateUrl: './search-episodes.component.html',
  styleUrls: ['./search-episodes.component.scss']
})
export class SearchEpisodesComponent implements OnInit {
  @Input() episodesItems: any;
  constructor() {}

  ngOnInit(): void {}
}
