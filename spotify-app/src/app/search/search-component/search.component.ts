import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  catchError
} from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { SpotifyServices } from '../../services/spotify-services';
import { FormControl } from '@angular/forms';
import { SpotifyApi } from 'src/app/models/@types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private spotifyServices: SpotifyServices) {}

  fontStyleControl = new FormControl();

  albumsData?: SpotifyApi.IAlbums;
  albumsItems?: SpotifyApi.IAlbums[];
  albumsPrevious: string = '';
  albumsNext: string = '';

  tracksData?: SpotifyApi.ITracks;
  tracksItems?: SpotifyApi.ITracks[];
  tracksPrevious: string = '';
  tracksNext: string = '';

  artistsData?: SpotifyApi.IArtists;
  artistsItems?: SpotifyApi.IArtists[];
  artistsPrevious: string = '';
  artistsNext: string = '';

  playlistsData?: SpotifyApi.IPlaylists;
  playlistsItems?: SpotifyApi.IPlaylists[];
  playlistsPrevious: string = '';
  playlistsNext: string = '';

  showsData?: SpotifyApi.IShows;
  showsItems?: SpotifyApi.IShows[];
  showsPrevious: string = '';
  showsNext: string = '';

  episodesData?: SpotifyApi.IEpisodes;
  episodesItems?: SpotifyApi.IEpisodes[];
  episodesPrevious: string = '';
  episodesNext: string = '';

  displayingContent: boolean = false;
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;

  isLoading: boolean = false;

  millisToMinutesAndSeconds(value: number): number {
    let minutes = Math.floor(value / 60000);
    return minutes;
  }

  ngOnInit() {
    fromEvent(this.movieSearchInput.nativeElement, 'keyup')
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
        this.isLoading = true;
        this.spotifyServices.searchForAnItem(text).subscribe(
          (res) => {
            this.albumsData = (res as any).albums;
            console.log(this.albumsData);
            this.albumsItems = (res as any).albums.items;
            this.albumsPrevious = '';
            this.albumsNext = '';

            this.tracksData = (res as any).tracks;
            this.tracksItems = (res as any).tracks.items;
            this.tracksPrevious = '';
            this.tracksNext = '';

            this.artistsData = (res as any).artists;
            this.artistsItems = (res as any).artists.items;
            this.artistsPrevious = '';
            this.artistsNext = '';

            this.playlistsData = (res as any).playlists;
            this.playlistsItems = (res as any).playlists.items;
            this.playlistsPrevious = '';
            this.playlistsNext = '';

            this.showsData = (res as any).shows;
            this.showsItems = (res as any).shows.items;
            this.showsPrevious = '';
            this.showsNext = '';

            this.episodesData = (res as any).episodes;
            this.episodesItems = (res as any).episodes.items;
            this.episodesPrevious = '';
            this.episodesNext = '';

            this.isLoading = false;
            this.displayingContent = true;
          },
          (err) => {
            console.error('error', err);
          }
        );
      });
  }

  addAlbumsItem(newItem: SpotifyApi.IAlbums[]) {
    this.albumsItems = newItem;
  }
  refreshAlbumsNextButton(value: string) {
    this.albumsNext = value;
  }
  refreshAlbumsPrevButton(value: string) {
    this.albumsPrevious = value;
  }

  addTracksItem(newItem: SpotifyApi.ITracks[]) {
    this.tracksItems = newItem;
  }
  refreshTracksNextButton(value: string) {
    this.tracksNext = value;
  }
  refreshTracksPrevButton(value: string) {
    this.tracksPrevious = value;
  }

  addArtistsItem(newItem: SpotifyApi.IArtists[]) {
    this.artistsItems = newItem;
  }
  refreshArtistsNextButton(value: string) {
    this.artistsNext = value;
  }
  refreshArtistsPrevButton(value: string) {
    this.artistsPrevious = value;
  }

  addPlaylistsItem(newItem: SpotifyApi.IPlaylists[]) {
    this.playlistsItems = newItem;
  }
  refreshPlaylistsNextButton(value: string) {
    this.playlistsNext = value;
  }
  refreshPlaylistsPrevButton(value: string) {
    this.playlistsPrevious = value;
  }

  addShowsItem(newItem: SpotifyApi.IShows[]) {
    this.showsItems = newItem;
  }
  refreshShowsNextButton(value: string) {
    this.showsNext = value;
  }
  refreshShowsPrevButton(value: string) {
    this.showsPrevious = value;
  }

  addEpisodesItem(newItem: SpotifyApi.IEpisodes[]) {
    this.episodesItems = newItem;
  }
  refreshEpisodesNextButton(value: string) {
    this.episodesNext = value;
  }
  refreshEpisodesPrevButton(value: string) {
    this.episodesPrevious = value;
  }
}
