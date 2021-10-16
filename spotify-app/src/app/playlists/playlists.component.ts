import { Component, OnInit } from '@angular/core';
import { SpotifyApi } from '../models/@types';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  constructor() {}

  tracksItem: string[] = [];
  playlistData: SpotifyApi.IReturnedPLaylist[] = [];
  ngOnInit(): void {
    this.playlistData = JSON.parse(
      localStorage.getItem('playlistArray') || '{}'
    );

    console.log(this.playlistData);
  }
}
