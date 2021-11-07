import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SpotifyApi } from 'src/app/models/@types';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BrowseApiService {
  browseUrl = 'https://api.spotify.com/v1/browse';

  access_token: null | string = localStorage.getItem('access_token');
  constructor(private http: HttpClient) {}

  getAllFeaturedPlaylists() {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + this.access_token);

    return this.http
      .get<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
        `${this.browseUrl}/featured-playlists`,
        { headers }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllCategories(
    params: SpotifyApi.SpotifyApiParams = {
      limit: 50
    }
  ) {
    return this.http
      .get<SpotifyApi.MultipleCategoriesResponse>(
        `${this.browseUrl}/categories`,
        {
          params
        }
      )
      .pipe(
        map((res) => {
          return res.categories;
        })
      );
  }

  getCategoryPlaylists(
    categoryId: string,
    params: SpotifyApi.SpotifyApiParams = {
      limit: 50
    }
  ) {
    return this.http
      .get<SpotifyApi.CategoryPlaylistsReponse>(
        `${this.browseUrl}/categories/${categoryId}/playlists`,
        {
          params
        }
      )
      .pipe(
        map((res) => {
          return res.playlists;
        })
      );
  }
}
