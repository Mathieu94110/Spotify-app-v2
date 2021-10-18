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
  artistsItems: IArstists[] = [];
  playlistsItems: IPlaylists[] = [];
  tracksItems: ITracks[] = [];
  showsItems: any[] = [];
  episodesItems: IEpisodes[] = [];
  tracks: boolean = true;
  playlists: boolean = true;
  artists: boolean = true;
  episodes: boolean = true;
  shows: boolean = true;
  albums: boolean = true;
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
            this.albumsItems = (res as any).albums.items;
            this.tracksItems = (res as any).tracks.items;
            this.artistsItems = (res as any).artists.items;
            this.playlistsItems = (res as any).playlists.items;
            this.showsItems = (res as any).shows.items;
            this.episodesItems = (res as any).episodes.items;
            this.isLoading = false;
            this.displayingContent = true;
          },
          (err) => {
            console.error('error', err);
          }
        );
      });
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
