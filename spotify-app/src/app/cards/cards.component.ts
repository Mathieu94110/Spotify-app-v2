import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
/**
 * @title Basic cards
 */
@Component({
  selector: 'card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  @Input()
  featPlaylists!: any; // FeaturedPlaylists;

  @Input()
  allCategories!: any; // FeaturedPlaylists;
  @Input()
  AllNewReleases!: any;

  previous!: string;
  next!: string;

  ngAfterViewInit() {
    if (this.featPlaylists.previous) {
      this.previous = this.featPlaylists.previous;
      //   this.next = this.featPlaylists.playlists.next!;
    }
    if (this.allCategories.previous) {
      this.previous = this.allCategories.previous;
      //  this.next = this.allCategories.playlists.next!;
    }
    if (this.AllNewReleases.previous) {
      this.previous = this.AllNewReleases.previous;
      //  this.next = this.allCategories.playlists.next!;
    }
  }
  @Output() previousFeaturedListEvent = new EventEmitter<string>();
  @Output() nextFeaturedListEvent = new EventEmitter<string>();

  @Output() previousallCategoriesEvent = new EventEmitter<string>();
  @Output() nextallCategoriesEvent = new EventEmitter<string>();

  @Output() previousAllNewReleasesEvent = new EventEmitter<string>();
  @Output() nextAllNewReleasesEvent = new EventEmitter<string>();

  previousFeaturedList(previous: string) {
    this.previousFeaturedListEvent.emit(previous);
  }
  nextFeaturedList(next: string) {
    if (next !== null && next !== undefined && next !== '') {
      this.nextFeaturedListEvent.emit(next);
    }
  }

  previousAllCategories(previous: string) {
    this.previousallCategoriesEvent.emit(previous);
  }
  nextAllCategories(next: string) {
    if (next !== null && next !== undefined && next !== '') {
      this.nextallCategoriesEvent.emit(next);
    }
  }

  previousAllNewReleases(previous: string) {
    this.previousAllNewReleasesEvent.emit(previous);
  }

  nextAllNewReleases(next: string) {
    if (next !== null && next !== undefined && next !== '') {
      this.nextAllNewReleasesEvent.emit(next);
    }
  }
}
/*
export interface FeaturedPlaylists {
  message: string;
  playlists: Iplaylists;
}

interface Iplaylists {
  href: string;
  items: IItems[];
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
  total: number;
}

interface IItems {
  collaborative: boolean;
  description: string;
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: IImages[];
  name: string;
  owner: IOwner;
  color?: any;
  public?: any;
  snapshot_id: string;
  tracks: ITracks;
  type: string;
  uri: string;
}

interface IExternalUrls {
  spotify: string;
}

interface IImages {
  height?: any;
  url: string;
  width?: any;
}

interface IOwner {
  display_name: string;
  external_urls: IExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface ITracks {
  href: string;
  total: number;
}
*/
