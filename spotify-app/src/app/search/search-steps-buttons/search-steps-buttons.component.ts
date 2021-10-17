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
  @Input() albumsItems: any;

  @Input() previous: any;

  @Input() next: any;

  albums: boolean = true;
  displayingContent: boolean = false;
  apiResponse!: any;
  constructor(private spotifyServices: SpotifyServices) {}

  ngOnInit(): void {
    console.log(this.next);
  }

  getPreviousAlbumsList(value: string) {
    this.spotifyServices.searchForAnItem(value).subscribe(
      (res: any) => {
        this.displayingContent = false;
        this.apiResponse = res.albums;
        this.previous = (res as any).albums.previous;
        this.next = (res as any).albums.next;
        // this.albumsItems = (res as any).albums.items;
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
        this.displayingContent = false;
        this.apiResponse = (res as any).albums;
        this.previous = (res as any).albums.previous;
        this.next = (res as any).albums.next;
        // this.albumsItems = (res as any).albums.items;
        this.displayingContent = true;
      },
      (err) => {
        console.error('error', err);
      }
    );
  }
}
