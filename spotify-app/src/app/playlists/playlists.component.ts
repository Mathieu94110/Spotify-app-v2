import { Component, OnInit } from '@angular/core';
import { SpotifyServices } from '../services/spotify-services';
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  constructor(private spotifyServices: SpotifyServices) {}

  ngOnInit(): void {}
  create() {
    this.spotifyServices.createPlaylist();
  }
}
