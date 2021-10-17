import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-artists',
  templateUrl: './search-artists.component.html',
  styleUrls: ['./search-artists.component.scss']
})
export class SearchArtistsComponent implements OnInit {
  @Input() artistsItems: any;
  constructor() {}

  ngOnInit(): void {}
}
