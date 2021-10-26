import { Component, OnInit } from '@angular/core';
import { SpotifyServices } from '../services/spotify-services';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  constructor(private spotifyServices: SpotifyServices) {}

  tracksItem: string[] = [];
  playlistData: any | undefined;

  async ngOnInit() {
    this.spotifyServices
      .getUserPlaylists()
      .subscribe(
        (userPlaylist) => (this.playlistData = (userPlaylist as any).items)
      );
  }

  deleteItem(id: string) {
    this.spotifyServices.deletePlaylistItem(id).subscribe((res) => {
      return res;
    });
    this.removePlaylistFromUi(id);
  }

  removePlaylistFromUi(id: string) {
    this.playlistData = this.playlistData.filter(
      (playlist: any) => playlist.id !== id
    );
  }
}
