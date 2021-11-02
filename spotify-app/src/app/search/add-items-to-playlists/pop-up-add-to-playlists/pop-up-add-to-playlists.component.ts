import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { SpotifyServices } from 'src/app/services/spotify-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pop-up-add-to-playlists',
  templateUrl: './pop-up-add-to-playlists.component.html',
  styleUrls: ['./pop-up-add-to-playlists.component.scss']
})
export class PopUpAddToPlaylistsComponent implements OnInit {
  isPlaylistData: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string, uri:string },
    private spotifyServices: SpotifyServices
  ) {}
  activeState = '';
  playlistData: any | undefined;
  playlistIdSelected: string = '';

  async ngOnInit() {
    console.log(this.data.id);
    this.spotifyServices
      .getUserPlaylists()
      .subscribe(
        (userPlaylist) => (this.playlistData = (userPlaylist as any).items)
      );
    this.isPlaylistData = !this.isPlaylistData;
  }
  setStateAsActive(playlist: any, playlistId: string) {
    this.activeState = playlist;
    this.playlistIdSelected = playlistId;
  }
  addItem() {
    console.log(this.playlistIdSelected ,);
    this.spotifyServices.addItemToPlaylist(this.playlistIdSelected, this.data.uri);
  }
}
