import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-playlists',
  templateUrl: './search-playlists.component.html',
  styleUrls: ['./search-playlists.component.scss']
})
export class SearchPlaylistsComponent implements OnInit {
  @Input() playlistsItems: any;

  constructor() {}

  ngOnInit(): void {}


}
