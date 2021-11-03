import { Component, OnInit } from '@angular/core';
import { SpotifyServices } from '../services/spotify-services';
import { ElementRef, ViewChild } from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  catchError
} from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { SpotifyApi } from 'src/app/models/@types';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistTracksModalComponent } from './playlist-tracks-modal/playlist-tracks-modal.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  constructor(
    private spotifyServices: SpotifyServices,
    public dialog: MatDialog
  ) {}

  tracksItem: any | undefined;
  playlistData: any | undefined;

  async ngOnInit() {
    this.spotifyServices.getUserPlaylists().subscribe((userPlaylist) =>
      (this.playlistData = (userPlaylist as any).items).map((playlist: any) => {
        console.log(playlist);
        console.log(this.playlistData);
      })
    );
  }

  deleteItem(id: string, href: string) {
    console.log(href);
    this.spotifyServices.deletePlaylistItem(id).subscribe((res) => {
      console.log(res);
      this.removePlaylistFromUi(href);
    });
  }

  removePlaylistFromUi(href: string) {
    this.playlistData = this.playlistData.filter(
      (playlist: any) => playlist.tracks.href !== href
    );
  }

  displayTracks(
    playlistId: string,
    playlistName: string,
    playlistSnapShotId: string
  ) {
    this.spotifyServices.getPlaylistsItems(playlistId).subscribe((res) => {
      this.tracksItem = res;
      console.log(this.tracksItem);
      this.openDialog(
        this.tracksItem,
        playlistName,
        playlistId,
        playlistSnapShotId
      );
    });
  }

  openDialog(
    playlistTracksData: any,
    playlistNameData: any,
    playlistId: any,
    playlistSnapShotId: any
  ) {
    const dialogRef = this.dialog.open(PlaylistTracksModalComponent, {
      data: {
        playlistTracksData: playlistTracksData,
        playlistNameData: playlistNameData,
        playlistId: playlistId,
        playlistSnapShotId: playlistSnapShotId
      }
    });
    console.log('from child dialog :', playlistTracksData);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    return dialogRef;
  }
}
