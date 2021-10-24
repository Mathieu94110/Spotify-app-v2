import { Component, Input, OnInit } from '@angular/core';
import { SpotifyServices } from 'src/app/services/spotify-services';
import { Output, EventEmitter } from '@angular/core';
import { SpotifyApi } from 'src/app/models/@types';

@Component({
  selector: 'app-search-steps-buttons',
  templateUrl: './search-steps-buttons.component.html',
  styleUrls: ['./search-steps-buttons.component.scss']
})
export class SearchStepsButtonsComponent implements OnInit {
  @Input() Previous: string | null = null;
  @Input() Next: string | null = '';
  @Input() ItemName?: string;

  @Input() albumsData?: SpotifyApi.IAlbums;
  @Input() albumsPrevious: string | null = null;
  @Input() albumsNext: string | null = '';

  @Input() tracksData?: SpotifyApi.ITracks;
  @Input() tracksPrevious: string | null = null;
  @Input() tracksNext: string | null = '';

  @Input() artistsData?: SpotifyApi.IArtists;
  @Input() artistsPrevious: string | null = null;
  @Input() artistsNext: string | null = '';

  @Input() playlistsData?: SpotifyApi.IPlaylists;
  @Input() playlistsPrevious: string | null = null;
  @Input() playlistsNext: string | null = '';

  @Input() showsData?: SpotifyApi.IShows;
  @Input() showsPrevious: string | null = null;
  @Input() showsNext: string | null = '';

  @Input() episodesData?: SpotifyApi.IEpisodes;
  @Input() episodesPrevious: string | null = null;
  @Input() episodesNext: string | null = '';

  @Output() newAlbumsItemEvent = new EventEmitter<any>();
  @Output() newAlbumsPreviousEvent = new EventEmitter<any>();
  @Output() newAlbumsNextEvent = new EventEmitter<any>();

  @Output() newTracksItemEvent = new EventEmitter<any>();
  @Output() newTracksPreviousEvent = new EventEmitter<any>();
  @Output() newTracksNextEvent = new EventEmitter<any>();

  @Output() newArtistsItemEvent = new EventEmitter<any>();
  @Output() newArtistsPreviousEvent = new EventEmitter<any>();
  @Output() newArtistsNextEvent = new EventEmitter<any>();

  @Output() newPlaylistsItemEvent = new EventEmitter<any>();
  @Output() newPlaylistsPreviousEvent = new EventEmitter<any>();
  @Output() newPlaylistsNextEvent = new EventEmitter<any>();

  @Output() newShowsItemEvent = new EventEmitter<any>();
  @Output() newShowsPreviousEvent = new EventEmitter<any>();
  @Output() newShowsNextEvent = new EventEmitter<any>();

  @Output() newEpisodesItemEvent = new EventEmitter<any>();
  @Output() newEpisodesPreviousEvent = new EventEmitter<any>();
  @Output() newEpisodesNextEvent = new EventEmitter<any>();

  albumsItems: SpotifyApi.IAlbums[] = [];
  tracksItems: SpotifyApi.ITracks[] = [];
  artistsItems: SpotifyApi.IArtists[] = [];
  playlistsItems: SpotifyApi.IPlaylists[] = [];
  showsItems: SpotifyApi.IShows[] = [];
  episodesItems: SpotifyApi.IEpisodes[] = [];

  constructor(private spotifyServices: SpotifyServices) {}

  ngOnInit(): void {
    if (this.Next === '' && this.ItemName === 'Albums') {
      this.Next = this.albumsData!.next;
    }
    if (this.Next == '' && this.ItemName === 'Tracks') {
      this.Next = this.tracksData!.next;
    }
    if (this.Next === '' && this.ItemName === 'Artists') {
      this.Next = this.artistsData!.next;
    }
    if (this.Next === '' && this.ItemName === 'Playlists') {
      this.Next = this.playlistsData!.next;
    }
    if (this.Next === '' && this.ItemName === 'Shows') {
      this.Next = this.showsData!.next;
    }
    if (this.Next === '' && this.ItemName === 'Episodes') {
      this.Next = this.episodesData!.next;
    }
  }

  getPreviousList(value: string | null, itemName: string | undefined) {
    if (value !== null && itemName !== undefined) {
      this.spotifyServices.searchOtherResult(value).subscribe((res) => {
        if (itemName === 'Albums') {
          this.albumsItems = (res as any).albums.items;
          this.albumsPrevious = (res as any).albums.previous;
          this.albumsNext = (res as any).albums.next;

          this.addNewAlbumsItem(this.albumsItems);
          this.refreshAlbumsPrevious(this.albumsPrevious);
          this.refreshAlbumsNext(this.albumsNext);
        } else if (itemName === 'Tracks') {
          this.tracksItems = (res as any).tracks.items;
          this.tracksPrevious = (res as any).tracks.previous;
          this.tracksNext = (res as any).tracks.next;

          this.addNewTracksItem(this.tracksItems);
          this.refreshTracksPrevious(this.tracksPrevious);
          this.refreshTracksNext(this.tracksNext);
        } else if (itemName === 'Artists') {
          this.artistsItems = (res as any).artists.items;
          this.artistsPrevious = (res as any).artists.previous;
          this.artistsNext = (res as any).artists.next;

          this.addNewArtistsItem(this.artistsItems);
          this.refreshArtistsPrevious(this.artistsPrevious);
          this.refreshArtistsNext(this.artistsNext);
        } else if (itemName === 'Playlists') {
          this.playlistsItems = (res as any).playlists.items;
          this.playlistsPrevious = (res as any).playlists.previous;
          this.playlistsNext = (res as any).playlists.next;

          this.addNewPlaylistsItem(this.playlistsItems);
          this.refreshPlaylistsPrevious(this.playlistsPrevious);
          this.refreshPlaylistsNext(this.playlistsNext);
        } else if (itemName === 'Shows') {
          this.showsItems = (res as any).shows.items;
          this.showsPrevious = (res as any).shows.previous;
          this.showsNext = (res as any).shows.next;

          this.addNewShowsItem(this.showsItems);
          this.refreshShowsPrevious(this.showsPrevious);
          this.refreshShowsNext(this.showsNext);
        } else if (itemName === 'Episodes') {
          this.episodesItems = (res as any).episodes.items;
          this.episodesPrevious = (res as any).episodes.previous;
          this.episodesNext = (res as any).episodes.next;

          this.addNewEpisodesItem(this.episodesItems);
          this.refreshEpisodesPrevious(this.episodesPrevious);
          this.refreshEpisodesNext(this.episodesNext);
        }
      });
    }
  }
  getNextList(value: string | null, itemName: string | undefined) {
    if (value !== null && itemName !== undefined) {
      this.spotifyServices.searchOtherResult(value).subscribe((res) => {
        if (itemName === 'Albums') {
          this.albumsItems = (res as any).albums.items;
          this.albumsPrevious = (res as any).albums.previous;
          this.albumsNext = (res as any).albums.next;

          this.addNewAlbumsItem(this.albumsItems);
          this.refreshAlbumsPrevious(this.albumsPrevious);
          this.refreshAlbumsNext(this.albumsNext);
        } else if (itemName === 'Tracks') {
          this.tracksItems = (res as any).tracks.items;
          this.tracksPrevious = (res as any).tracks.previous;
          this.tracksNext = (res as any).tracks.next;

          this.addNewTracksItem(this.tracksItems);
          this.refreshTracksPrevious(this.tracksPrevious);
          this.refreshTracksNext(this.tracksNext);
        } else if (itemName === 'Artists') {
          this.artistsItems = (res as any).artists.items;
          this.artistsPrevious = (res as any).artists.previous;
          this.artistsNext = (res as any).artists.next;

          this.addNewArtistsItem(this.artistsItems);
          this.refreshArtistsPrevious(this.artistsPrevious);
          this.refreshArtistsNext(this.artistsNext);
        } else if (itemName === 'Playlists') {
          this.playlistsItems = (res as any).playlists.items;
          this.playlistsPrevious = (res as any).playlists.previous;
          this.playlistsNext = (res as any).playlists.next;

          this.addNewPlaylistsItem(this.playlistsItems);
          this.refreshPlaylistsPrevious(this.playlistsPrevious);
          this.refreshPlaylistsNext(this.playlistsNext);
        } else if (itemName === 'Shows') {
          this.showsItems = (res as any).shows.items;
          this.showsPrevious = (res as any).shows.previous;
          this.showsNext = (res as any).shows.next;

          this.addNewShowsItem(this.showsItems);
          this.refreshShowsPrevious(this.showsPrevious);
          this.refreshShowsNext(this.showsNext);
        } else if (itemName === 'Episodes') {
          this.episodesItems = (res as any).episodes.items;
          this.episodesPrevious = (res as any).episodes.previous;
          this.episodesNext = (res as any).episodes.next;

          this.addNewEpisodesItem(this.episodesItems);
          this.refreshEpisodesPrevious(this.episodesPrevious);
          this.refreshEpisodesNext(this.episodesNext);
        }
      });
    }
  }

  addNewAlbumsItem(value: SpotifyApi.IAlbums[]) {
    this.newAlbumsItemEvent.emit(value);
  }
  refreshAlbumsPrevious(value: string | null) {
    this.newAlbumsPreviousEvent.emit(value);
  }
  refreshAlbumsNext(value: string | null) {
    this.newAlbumsNextEvent.emit(value);
  }

  addNewTracksItem(value: SpotifyApi.ITracks[]) {
    this.newTracksItemEvent.emit(value);
  }
  refreshTracksPrevious(value: string | null) {
    this.newTracksPreviousEvent.emit(value);
  }
  refreshTracksNext(value: string | null) {
    this.newTracksNextEvent.emit(value);
  }

  addNewArtistsItem(value: SpotifyApi.IArtists[]) {
    this.newArtistsItemEvent.emit(value);
  }
  refreshArtistsPrevious(value: string | null) {
    this.newArtistsPreviousEvent.emit(value);
  }
  refreshArtistsNext(value: string | null) {
    this.newArtistsNextEvent.emit(value);
  }

  addNewPlaylistsItem(value: SpotifyApi.IPlaylists[]) {
    this.newPlaylistsItemEvent.emit(value);
  }
  refreshPlaylistsPrevious(value: string | null) {
    this.newPlaylistsPreviousEvent.emit(value);
  }
  refreshPlaylistsNext(value: string | null) {
    this.newPlaylistsNextEvent.emit(value);
  }

  addNewShowsItem(value: SpotifyApi.IShows[]) {
    this.newShowsItemEvent.emit(value);
  }
  refreshShowsPrevious(value: string | null) {
    this.newShowsPreviousEvent.emit(value);
  }
  refreshShowsNext(value: string | null) {
    this.newShowsNextEvent.emit(value);
  }

  addNewEpisodesItem(value: SpotifyApi.IEpisodes[]) {
    this.newEpisodesItemEvent.emit(value);
  }
  refreshEpisodesPrevious(value: string | null) {
    this.newEpisodesPreviousEvent.emit(value);
  }
  refreshEpisodesNext(value: string | null) {
    this.newEpisodesNextEvent.emit(value);
  }
}
