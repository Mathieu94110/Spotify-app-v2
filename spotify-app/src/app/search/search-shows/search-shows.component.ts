import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-shows',
  templateUrl: './search-shows.component.html',
  styleUrls: ['./search-shows.component.scss']
})
export class SearchShowsComponent implements OnInit {
  @Input() showsItems: any;
  constructor() {}

  ngOnInit(): void {}
}
