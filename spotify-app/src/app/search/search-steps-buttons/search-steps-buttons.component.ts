import { Component, Input, OnInit } from '@angular/core';
import { SpotifyServices } from 'src/app/services/spotify-services';

interface IOtherAlbums {
  albums: IAlbums;
}
interface IAlbums {
  href: string;
  items: any[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

@Component({
  selector: 'app-search-steps-buttons',
  templateUrl: './search-steps-buttons.component.html',
  styleUrls: ['./search-steps-buttons.component.scss']
})
export class SearchStepsButtonsComponent implements OnInit {
  @Input() apiRes: any;
  @Input() albumsItems: any;
  @Input() tracksItems: any;
  @Input() artistsItems: any;
  @Input() playlistsItems: any;
  @Input() episodesItems: any;
  @Input() showsItems: any;

  // displayingContent: boolean = false;
  albums: boolean = true;
  albumsPrevious: string = '';
  albumsNext: string = '';

  tracksPrevious: string = '';
  tracksNext: string = '';

  artistsPrevious: string = '';
  artistsNext: string = '';

  playlistsPrevious: string = '';
  playlistsNext: string = '';

  episodesPrevious: string = '';
  episodesNext: string = '';

  showsPrevious: string = '';
  showsNext: string = '';

  constructor(private spotifyServices: SpotifyServices) {}

  ngOnInit(): void {
    console.log(this.apiRes);
    this.albumsPrevious = this.apiRes.albums.previous;
    this.albumsNext = this.apiRes.albums.next;

    this.tracksPrevious = this.apiRes.tracks.previous;
    this.tracksNext = this.apiRes.tracks.next;

    this.artistsPrevious = this.apiRes.artists.previous;
    this.artistsNext = this.apiRes.artists.next;

    this.playlistsPrevious = this.apiRes.playlists.previous;
    this.playlistsNext = this.apiRes.playlists.next;

    this.episodesPrevious = this.apiRes.episodes.previous;
    this.episodesNext = this.apiRes.episodes.next;

    this.showsPrevious = this.apiRes.shows.previous;
    this.showsNext = this.apiRes.shows.next;
  }

  getPrevList(value: string) {
    if (value === 'albums') {
      value = this.albumsPrevious;
    }
    if (value === 'tracks') {
      value = this.tracksPrevious;
    }
    if (value === 'artists') {
      value = this.artistsPrevious;
    }
    if (value === 'playlists') {
      value = this.playlistsPrevious;
    }
    if (value === 'episodes') {
      value = this.episodesPrevious;
    }
    if (value === 'shows') {
      value = this.showsPrevious;
    }
    this.spotifyServices.searchOtherResult(value).subscribe(
      (res: any) => {
        //albums
        this.albumsItems = (res as any).albums.items;
        this.albumsPrevious = (res as any).albums.previous;
        this.albumsNext = (res as any).albums.next;
        //tracks
        // this.tracksItems = (res as any).tracks.items;
        // this.tracksPrevious = (res as any).tracks.previous;
        // this.tracksNext = (res as any).tracks.next;
        // //artists
        // this.artistsItems = (res as any).artists.items;
        // this.artistsPrevious = (res as any).artists.previous;
        // this.artistsNext = (res as any).artists.next;
        // //playlists
        // this.playlistsItems = (res as any).playlists.items;
        // this.playlistsPrevious = (res as any).playlists.previous;
        // this.playlistsNext = (res as any).playlists.next;
        // //episodes
        // this.episodesItems = (res as any).episodes.items;
        // this.episodesPrevious = (res as any).episodes.previous;
        // this.episodesNext = (res as any).episodes.next;
        // //shows
        // this.showsItems = (res as any).shows.items;
        // this.showsPrevious = (res as any).shows.previous;
        // this.showsNext = (res as any).shows.next;
        // this.displayingContent = true;
      },
      (err) => {
        console.error('error', err);
      }
    );
  }
  getNextList(value: string) {
    this.spotifyServices.searchOtherResult(value).subscribe(
      (res) => {
        console.log(res);
        //albums
        this.albumsItems = (res as any).albums.items;
        this.albumsPrevious = (res as any).albums.previous;
        this.albumsNext = (res as any).albums.next;
        //tracks
        this.tracksItems = (res as any).tracks.items;
        this.tracksPrevious = (res as any).tracks.previous;
        this.tracksNext = (res as any).tracks.next;
        //artists
        this.artistsItems = (res as any).artists.items;
        this.artistsPrevious = (res as any).artists.previous;
        this.artistsNext = (res as any).artists.next;
        //playlists
        this.playlistsItems = (res as any).playlists.items;
        this.playlistsPrevious = (res as any).playlists.previous;
        this.playlistsNext = (res as any).playlists.next;
        //episodes
        this.episodesItems = (res as any).episodes.items;
        this.episodesPrevious = (res as any).episodes.previous;
        this.episodesNext = (res as any).episodes.next;
        //shows
        this.showsItems = (res as any).shows.items;
        this.showsPrevious = (res as any).shows.previous;
        this.showsNext = (res as any).shows.next;
      },
      (err) => {
        console.error('error', err);
      }
    );
  }
}
