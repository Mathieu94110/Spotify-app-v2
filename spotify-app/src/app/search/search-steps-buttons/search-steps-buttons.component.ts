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
  albums: boolean = true;
  displayingContent: boolean = false;
  albumsPrevious: string = '';
  albumsNext: string = '';

  constructor(private spotifyServices: SpotifyServices) {}

  ngOnInit(): void {
    console.log(this.apiRes);
    this.albumsPrevious = this.apiRes.albums.previous;
    this.albumsNext = this.apiRes.albums.next;

    console.log(this.albumsPrevious);
    console.log(this.albumsNext);
  }

  getPreviousAlbumsList(value: string) {
    this.spotifyServices.searchOtherResult(value).subscribe(
      (res: any) => {
     this.albumsItems = (res as any).albums.items;
     // this.displayingContent = false;
     // this.apiResponse = (res as any).albums;
     this.albumsPrevious = (res as any).albums.previous;
     this.albumsNext = (res as any).albums.next;

        this.displayingContent = true;
      },
      (err) => {
        console.error('error', err);
      }
    );
  }
  getNextAlbumsList(value: string) {
    this.spotifyServices.searchOtherResult(value).subscribe(
      (res) => {
        console.log(res);
        this.albumsItems = (res as any).albums.items;
        // this.displayingContent = false;
        // this.apiResponse = (res as any).albums;
        this.albumsPrevious = (res as any).albums.previous;
        this.albumsNext = (res as any).albums.next;
        // // this.albumsItems = (res as any).albums.items;
        // this.displayingContent = true;
      },
      (err) => {
        console.error('error', err);
      }
    );
  }
}
