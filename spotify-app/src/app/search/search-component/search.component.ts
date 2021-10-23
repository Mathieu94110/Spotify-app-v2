import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  catchError
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SpotifyServices } from '../../services/spotify-services';
import { FormControl } from '@angular/forms';

//  export interface IAlbums{
//   artists: string, name: string, images: string, release_date: string, release_date_precision: string, total_tracks: number;description:string ; publisher:any; owner:string; genres:string ; popularity:any; track_number:any
//   }

interface IAlbums {
  artists: any;
  name: string;
  images: any;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  next: string | null;
  previous: string | null;
}
interface ITracks {
  artists: any;
  name: string;
  album: any;
  popularity: any;
  track_number: number;
}

interface IArstists {
  name: string;
  images: any;
  popularity: any;
  genres: string;
}
interface IPlaylists {
  images: any;
  description: string;
  owner: any;
  name: string;
}
interface IItems {
  description: string;
  publisher: any;
  name: string;
  images: any;
}

interface IEpisodes {
  name: string;
  images: any;
  description: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private spotifyServices: SpotifyServices) {}
  fontStyleControl = new FormControl();
  fontStyle?: string;
  albumsItems: IAlbums[] = [];
  albumsPrevious: any;
  albumsNext: any;
  artistsItems: IArstists[] = [];
  playlistsItems: IPlaylists[] = [];
  tracksItems: ITracks[] = [];
  tracksPrevious: any;
  tracksNext: any;
  showsItems: any[] = [];
  episodesItems: IEpisodes[] = [];
  tracks: boolean = true;
  playlists: boolean = true;
  artists: boolean = true;
  episodes: boolean = true;
  shows: boolean = true;
  albums: boolean = true;
  albumsData: any;
  tracksData: any;
  formattedItems = [];
  displayingContent: boolean = false;
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;
  album: string = 'albums';
  isLoading: boolean = false;
  apiRes: any;
  millisToMinutesAndSeconds(value: number): number {
    let minutes = Math.floor(value / 60000);
    return minutes;
  }
  // getPreviousAlbumsList(value: string) {
  //   this.spotifyServices.searchForAnItem(value).subscribe(
  //     (res) => {
  //       this.displayingContent = false;
  //       this.apiResponse = (res as any).albums;
  //       this.previous = (res as any).albums.previous;
  //       this.next = (res as any).albums.next;
  //       this.albumsItems = (res as any).albums.items;
  //       this.displayingContent = true;
  //     },
  //     (err) => {
  //       console.error('error', err);
  //     }
  //   );
  // }
  // getNextAlbumsList(value: string) {
  //   this.spotifyServices.searchForAnItem(value).subscribe(
  //     (res) => {
  //       this.displayingContent = false;
  //       this.apiResponse = (res as any).albums;
  //       this.previous = (res as any).albums.previous;
  //       this.next = (res as any).albums.next;
  //       this.albumsItems = (res as any).albums.items;
  //       this.displayingContent = true;
  //     },
  //     (err) => {
  //       console.error('error', err);
  //     }
  //   );
  // }
  ngOnInit() {
    fromEvent(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.isLoading = true;
        this.spotifyServices.searchForAnItem(text).subscribe(
          (res) => {
            this.apiRes = res;
            console.log(res);
            this.albumsData = (res as any).albums;
            this.albumsItems = (res as any).albums.items;
            this.albumsPrevious = '';
            this.albumsNext = '';

            // console.log('albums', this.albumsItems);
            this.tracksData = (res as any).tracks;
            this.tracksItems = (res as any).tracks.items;
            this.tracksPrevious = '';
            this.tracksNext = '';

            // console.log('tracks', this.tracksItems);
            this.artistsItems = (res as any).artists.items;
            // console.log('artists', this.artistsItems);
            this.playlistsItems = (res as any).playlists.items;
            // console.log('playlist', this.playlistsItems);
            this.showsItems = (res as any).shows.items;
            // console.log('shows', this.showsItems);
            this.episodesItems = (res as any).episodes.items;
            // console.log('episodes', this.episodesItems);
            this.isLoading = false;
            this.displayingContent = true;
          },
          (err) => {
            console.error('error', err);
          }
        );
      });
  }

  addItem(newItem: any) {
    if (newItem.name === 'Albums') {
      this.albumsItems = newItem.items;
    } else if (newItem.name === 'Tracks') {
      this.tracksItems = newItem.items;
    }
  }
  refreshNextButton(value: any) {
    if (value.name === 'Albums') {
      this.albumsNext = value.items;
    } else if (value.name === 'Tracks') {
      this.tracksNext = value.items;
    }
  }
  refreshPrevButton(value: any) {
    if (value.name === 'Albums') {
      this.albumsPrevious = value.items;
    } else if (value.name === 'Tracks') {
      this.albumsPrevious = value.items;
    }
  }

  displayCategorie(value: string) {
    if (value === 'tracks') {
      this.tracks = !this.tracks;
    } else if (value === 'albums') {
      this.albums = !this.albums;
    } else if (value === 'artists') {
      this.artists = !this.artists;
    } else if (value === 'episodes') {
      this.episodes = !this.episodes;
    } else if (value === 'shows') {
      this.shows = !this.shows;
    } else if (value === 'playlists') {
      this.playlists = !this.playlists;
    }
  }
}
