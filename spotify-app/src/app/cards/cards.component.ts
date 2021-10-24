import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SpotifyApi } from '../models/@types';
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
  featPlaylists?: SpotifyApi.IfeaturedPlaylists;

  @Input()
  allCategories?: SpotifyApi.IAllCategories;
  @Input()
  AllNewReleases?: SpotifyApi.IAllNewReleases;

  previous: string | null = '';
  next: string | null = '';

  @Output() previousFeaturedListEvent = new EventEmitter<string | null>();
  @Output() nextFeaturedListEvent = new EventEmitter<string | null>();

  @Output() previousallCategoriesEvent = new EventEmitter<string | null>();
  @Output() nextallCategoriesEvent = new EventEmitter<string | null>();

  @Output() previousAllNewReleasesEvent = new EventEmitter<string | null>();
  @Output() nextAllNewReleasesEvent = new EventEmitter<string | null>();

  previousFeaturedList(previous: string | null) {
    this.previousFeaturedListEvent.emit(previous);
  }
  nextFeaturedList(next: string | null) {
    if (next !== null && next !== undefined && next !== '') {
      this.nextFeaturedListEvent.emit(next);
    }
  }

  previousAllCategories(previous: string | null) {
    this.previousallCategoriesEvent.emit(previous);
  }
  nextAllCategories(next: string | null) {
    if (next !== null && next !== undefined && next !== '') {
      this.nextallCategoriesEvent.emit(next);
    }
  }

  previousAllNewReleases(previous: string | null) {
    this.previousAllNewReleasesEvent.emit(previous);
  }

  nextAllNewReleases(next: string | null) {
    if (next !== null && next !== undefined && next !== '') {
      this.nextAllNewReleasesEvent.emit(next);
    }
  }
}
