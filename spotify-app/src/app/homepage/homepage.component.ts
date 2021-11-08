import { Component } from '@angular/core';
import { SpotifyServices } from '../services/spotify-services';
import { FormControl } from '@angular/forms';
import { BrowseApiService } from '../services/browse-api-services';
import { SpotifyApi } from '../models/@types';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  constructor(
    private spotifyServices: SpotifyServices,
    private browseApiService: BrowseApiService
  ) {}

  featuredPlaylists: SpotifyApi.IfeaturedPlaylists =
    {} as SpotifyApi.IfeaturedPlaylists;
  AllNewReleases: SpotifyApi.IAllNewReleases = {} as SpotifyApi.IAllNewReleases;
  allCategories: SpotifyApi.IAllCategories = {} as SpotifyApi.IAllCategories;
  favouritesArtists: SpotifyApi.IFavouritesArtists =
    {} as SpotifyApi.IFavouritesArtists;

  searchControl = new FormControl();
  initialFeaturedValue: string = `https://api.spotify.com/v1/browse/featured-playlists?country=FR&limit=2`;
  initialCategoriesValue: string = `https://api.spotify.com/v1/browse/categories?country=FR&limit=2`;
  initialNewReleaseValues: string = `https://api.spotify.com/v1/browse/new-releases?country=FR&limit=2`;

  ngOnInit() {
    this.spotifyServices.getToken();
  }

  ngAfterContentInit() {
    this.browseApiService.getAllCategories();
    this.browseApiService.getCategoryPlaylists('party');
    this.browseApiService.getAllFeaturedPlaylists();
    this.spotifyServices.getUserFavouriteArtists();

    this.spotifyServices
      .getFeaturedPlaylists(this.initialFeaturedValue)
      .subscribe((res: any) => {
        console.log(res);
        this.featuredPlaylists.image = res.playlists.items[0].images[0].url;
        this.featuredPlaylists.message = res.message;
        this.featuredPlaylists.description = res.playlists.items[0].description;
        this.featuredPlaylists.previous =
          res.playlists.previous === null ? '' : res.playlists.previous;
        this.featuredPlaylists.next =
          res.playlists.next === null ? '' : res.playlists.next;
      });
    this.spotifyServices
      .getAllCategories(this.initialCategoriesValue)
      .subscribe((res: any) => {
        console.log(res);
        this.allCategories.name = res.categories.items[0].name;
        this.allCategories.icon = res.categories.items[0].icons[0].url;
        this.allCategories.id = res.categories.items[0].id;
        this.allCategories.previous =
          res.categories.previous === null ? '' : res.categories.previous;
        this.allCategories.next =
          res.categories.next === null ? '' : res.categories.next;
      });
    this.spotifyServices
      .getAllNewReleases(this.initialNewReleaseValues)
      .subscribe((res: any) => {
        console.log(res);
        this.AllNewReleases.name = res.albums.items[0].name;
        this.AllNewReleases.artist_name = res.albums.items[0].artists[0].name;
        this.AllNewReleases.image = res.albums.items[0].images[0].url;
        this.AllNewReleases.previous = res.albums.previous;
        this.AllNewReleases.next = res.albums.next;
      });

    this.spotifyServices.getUserFavouriteArtists().subscribe((res: any) => {
      this.favouritesArtists.name = res.artists.items[0].name;
      this.favouritesArtists.genres = res.artists.items[0].genres;
      this.favouritesArtists.image = res.artists.items[0].images[0].url;
      this.favouritesArtists.previous = res.artists.previous;
      this.favouritesArtists.next = res.artists.next;
    });
  }
  getPreviousFeaturedList(value: string | null) {
    if (value !== null) {
      this.spotifyServices.getFeaturedPlaylists(value).subscribe((res: any) => {
        this.updatePlaylists(res);
      });
    }
  }
  getNextFeaturedList(value: string | null) {
    if (value !== null) {
      this.spotifyServices.getFeaturedPlaylists(value).subscribe((res: any) => {
        this.updatePlaylists(res);
      });
    }
  }
  getPreviousAllCategories(value: string | null) {
    if (value !== null) {
      this.spotifyServices.getAllCategories(value).subscribe((res: any) => {
        this.updateCategories(res);
      });
    }
  }
  getNextAllCategories(value: string | null) {
    if (value !== null) {
      this.spotifyServices.getAllCategories(value).subscribe((res: any) => {
        this.updateCategories(res);
      });
    }
  }
  getNextAllNewReleases(value: string | null) {
    if (value !== null) {
      this.spotifyServices.getAllNewReleases(value).subscribe((res: any) => {
        this.updateNewReleasesData(res);
      });
    }
  }
  getPreviousAllNewReleases(value: string | null) {
    if (value !== null) {
      this.spotifyServices.getAllNewReleases(value).subscribe((res: any) => {
        this.updateNewReleasesData(res);
      });
    }
  }

  updatePlaylists(res: any) {
    this.featuredPlaylists.image = res.playlists.items[0].images[0].url;
    this.featuredPlaylists.message = res.message;
    this.featuredPlaylists.description = res.playlists.items[0].description;
    this.featuredPlaylists.previous =
      res.playlists.previous === null ? '' : res.playlists.previous;
    this.featuredPlaylists.next =
      res.playlists.next === null ? '' : res.playlists.next;
  }

  updateCategories(res: any) {
    this.allCategories.name = res.categories.items[0].name;
    this.allCategories.icon = res.categories.items[0].icons[0].url;
    this.allCategories.id = res.categories.items[0].id;
    this.allCategories.previous =
      res.categories.previous === null ? '' : res.categories.previous;
    this.allCategories.next =
      res.categories.next === null ? '' : res.categories.next;
  }

  updateNewReleasesData(res: any) {
    this.AllNewReleases.name = res.albums.items[0].name;
    this.AllNewReleases.artist_name = res.albums.items[0].artists[0].name;
    this.AllNewReleases.image = res.albums.items[0].images[0].url;
    this.AllNewReleases.previous = res.albums.previous;
    this.AllNewReleases.next = res.albums.next;
  }
}
