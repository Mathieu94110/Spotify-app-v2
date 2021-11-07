import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map
} from 'rxjs/operators';
import { SpotifyApi } from 'src/app/models/@types';
import { SpotifyServices } from 'src/app/services/spotify-services';


@Component({
  selector: 'app-playlists-images',
  templateUrl: './playlists-images.component.html',
  styleUrls: ['./playlists-images.component.scss']
})
export class PlaylistsImagesComponent implements OnInit {
  dataLoaded: boolean = false;
  @Input() playlistId: string | undefined;

  constructor(private spotifyServices: SpotifyServices) {}

  @ViewChild('playlistImageSearchInput', { static: true })
  playlistImageSearchInput!: ElementRef;
  albumsData?: SpotifyApi.IAlbums[] = [];

  ngOnInit() {
    fromEvent(this.playlistImageSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        catchError((error) => of(`Bad Promise: ${error}`)),
        filter((res) => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.spotifyServices.searchForAnItem(text).subscribe(
          (res: any) => {
            this.dataLoaded = true;
            this.albumsData = res.albums.items;
            console.log(this.albumsData);
          },
          (err) => {
            console.error('error', err);
          }
        );
      });
  }

  getPlaylistCoverImage(playlistId: string, url: string) {
    console.log(this.albumsData);
    this.spotifyServices
      .getPlaylistCoverImage(playlistId, url)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
