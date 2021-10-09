import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SpotifyApi } from 'src/app/models/@types';
import { HttpHeaders, HttpParams } from '@angular/common/http';

interface SpotifyApiParams {
  limit?: any;
  offset?: any;
  [key: string]: any;
}
@Injectable({ providedIn: 'root' })
export class BrowseApiService {
  browseUrl: string;
  access_token: null | string = localStorage.getItem('access_token');
  constructor(private http: HttpClient) {
    this.browseUrl = 'https://api.spotify.com/v1/browse';
  }
  headerDict = {
    Authorization: this.access_token
  };
  getAllFeaturedPlaylists() {
    let headers = new HttpHeaders() // enlever 2eme Authorizaion sinon
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + this.access_token);

    return this.http
      .get<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
        `${this.browseUrl}/featured-playlists`,
        { headers }
      )
      .pipe(
        map((res) => {
          console.log('res of getAllFeaturedPlaylists ', res);
          return res;
        })
      );
  }

  getAllCategories(
    params: SpotifyApiParams = {
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
          console.log('res of getAllCategories ', res.categories);
          return res.categories;
        })
      );
  }

  getCategoryPlaylists(
    categoryId: string,
    params: SpotifyApiParams = {
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
          console.log('res of getCategoryPlaylists ', res.playlists);
          return res.playlists;
        })
      );
  }
}
