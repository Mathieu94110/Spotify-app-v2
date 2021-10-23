import { Component, Input, OnInit } from '@angular/core';
import { SpotifyServices } from 'src/app/services/spotify-services';
import { Output, EventEmitter } from '@angular/core';

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
  @Input() Data: any;
  @Input() Previous: any;
  @Input() Next: any;
  @Input() ItemName: any;

  @Input() albumsData: any;
  @Input() albumsPrevious: any;
  @Input() albumsNext: any;

  @Input() tracksData: any;
  @Input() tracksPrevious: any;
  @Input() tracksNext: any;

  @Input() artistsItems: any;
  @Input() playlistsItems: any;
  @Input() episodesItems: any;
  @Input() showsItems: any;

  @Output() newItemEvent = new EventEmitter<{ items: object; name: string }>();
  @Output() newPreviousEvent = new EventEmitter<any>();
  @Output() newNextEvent = new EventEmitter<any>();
  // displayingContent: boolean = false;
  albums: boolean = true;
  // albumsPrevious: string = '';
  // albumsNext: string = '';

  // tracksPrevious: string = '';
  // tracksNext: string = '';

  artistsPrevious: string = '';
  artistsNext: string = '';

  playlistsPrevious: string = '';
  playlistsNext: string = '';

  episodesPrevious: string = '';
  episodesNext: string = '';

  showsPrevious: string = '';
  showsNext: string = '';

  albumsItems: any;
  tracksItems: any;
  constructor(private spotifyServices: SpotifyServices) {}

  ngOnInit(): void {
    if (this.Next === '') {
      this.Next = this.Data.next;
    }
  }

  getPreviousList(value: string, itemName: string) {
    this.spotifyServices.searchOtherResult(value).subscribe((res) => {
      if (itemName === 'Albums') {
        this.albumsItems = (res as any).albums.items;
        this.albumsPrevious = (res as any).albums.previous;
        this.albumsNext = (res as any).albums.next;

        this.addNewItem({ items: this.albumsItems, name: 'Albums' });
        this.refreshPrevious(this.albumsPrevious);
        this.refreshNext(this.albumsNext);
      } else if (itemName === 'Tracks') {
        this.tracksItems = (res as any).tracks.items;
        this.tracksPrevious = (res as any).tracks.previous;
        this.tracksNext = (res as any).tracks.next;

        this.addNewItem({ items: this.tracksItems, name: 'Tracks' });
        this.refreshPrevious(this.tracksPrevious);
        this.refreshNext(this.tracksNext);
      }
    });
  }
  getNextList(value: string, itemName: string) {
    this.spotifyServices.searchOtherResult(value).subscribe(
      (res) => {
        if (itemName === 'Albums') {
          this.albumsItems = (res as any).albums.items;
          this.albumsPrevious = (res as any).albums.previous;
          this.albumsNext = (res as any).albums.next;

          this.addNewItem({ items: this.albumsItems, name: 'Albums' });
          this.refreshPrevious({ items: this.albumsPrevious, name: 'Albums' });
          this.refreshNext({ items: this.albumsNext, name: 'Albums' });
        } else if (itemName === 'Tracks') {
          this.tracksItems = (res as any).tracks.items;
          this.tracksPrevious = (res as any).tracks.previous;
          this.tracksNext = (res as any).tracks.next;

          this.addNewItem({ items: this.tracksItems, name: 'Tracks' });
          this.refreshPrevious({ items: this.tracksPrevious, name: 'Tracks' });
          this.refreshNext({ items: this.tracksNext, name: 'Tracks' });
        }
      }
      // //tracks
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
    );
  }

  addNewItem(value: { items: object; name: string }) {
    this.newItemEvent.emit(value);
  }
  refreshPrevious(value: { items: object; name: string }) {
    this.newPreviousEvent.emit(value);
  }
  refreshNext(value: { items: object; name: string }) {
    this.newNextEvent.emit(value);
  }
}
