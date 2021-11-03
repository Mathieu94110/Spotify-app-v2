import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { SpotifyServices } from 'src/app/services/spotify-services';

@Component({
  selector: 'app-playlist-tracks-modal',
  templateUrl: './playlist-tracks-modal.component.html',
  styleUrls: ['./playlist-tracks-modal.component.scss']
})
export class PlaylistTracksModalComponent implements OnInit {
  isPlaylistData: boolean = false;
  playlistTracksData: any | undefined;
  playlistName: string | undefined;
  playlistId: string | undefined;
  playlistSnapShotId: string | undefined;

  constructor(
    private spotifyServices: SpotifyServices,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      playlistTracksData: any;
      playlistNameData: string;
      playlistId: string;
      playlistSnapShotId: string;
    }
  ) {}

  activeState = '';
  playlistData: any | undefined;
  playlistIdSelected: string = '';

  async ngOnInit() {
    console.log(this.data.playlistTracksData);
    this.playlistTracksData = this.data.playlistTracksData;
    this.playlistName = this.data.playlistNameData;
    this.isPlaylistData = !this.isPlaylistData;
    this.playlistId = this.data.playlistId;
    this.playlistSnapShotId = this.data.playlistSnapShotId;
  }

  deleteTrack(
    playlistId: string | undefined,
    trackUri: string,
    playlistSnapShotId: string | undefined,
    trackId: string
  ) {
    this.spotifyServices.removePlaylistItem(
      playlistId,
      trackUri,
      playlistSnapShotId
    );

    this.removeTrackFromUi(trackId);
  }

  removeTrackFromUi(trackId: string) {
    this.playlistTracksData.items = Object.values(
      this.playlistTracksData.items
    ).filter((playlist: any) => playlist.track.id !== trackId);
  }

  msToMinutesAndSeconds = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);

    return `${minutes}:${seconds < '10' ? '0' : ''}${seconds}`;
  };
}
