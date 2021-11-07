import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SpotifyApi } from '../models/@types';

@Injectable({ providedIn: 'root' })
export class SpotifyServices {
  code: string | undefined;
  uri: string = environment.uri;
  baseURL: string = 'https://accounts.spotify.com/api/token';
  redirect_uri: any = `${this.uri}homepage`;
  token: SpotifyApi.IToken | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  newToken: string | undefined;
  errorMessage: any;
  search: string = 'https://api.spotify.com/v1/search';
  clientSecret: string = environment.clientSecret;
  authorizeUri: string = environment.authorizeUri;
  clientId: string = environment.clientId;
  scopes: string[] = environment.SCOPES;
  browseUrl = 'https://api.spotify.com/v1/browse';
  tokenValue: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  login() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirect_uri,
      scope: encodeURIComponent(this.scopes.join(' ')),
      response_type: 'code'
    });
    window.location = <any>`${this.authorizeUri}?${params.toString()}`;
  }

  getToken() {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
    });
    const encodedClientDetails = btoa(this.clientId + ':' + this.clientSecret);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + encodedClientDetails);

    let body = 'grant_type=authorization_code';
    body += '&code=' + this.code;
    body += '&redirect_uri=' + `${this.uri}homepage`;

    this.http.post<any>(this.baseURL, body, { headers }).subscribe({
      next: (data: SpotifyApi.IToken) => {
        this.token = data;
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        localStorage.setItem('access_token', this.accessToken);
        localStorage.setItem('refresh_token', this.refreshToken);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  getFeaturedPlaylists(value: string) {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<SpotifyApi.ListOfFeaturedPlaylistsResponse>(value, {
      headers
    });
  }

  getAllCategories(value: string) {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<SpotifyApi.MultipleCategoriesResponse>(value, {
      headers
    });
  }

  getAllNewReleases(value: string) {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<SpotifyApi.MultipleCategoriesResponse>(value, {
      headers
    });
  }

  getCategoryPlaylists(
    categoryId: string,
    params: SpotifyApi.SpotifyApiParams = {
      limit: 50
    }
  ) {
    return this.http
      .get<any>(`${this.browseUrl}/categories/${categoryId}/playlists`, {
        params
      })
      .pipe(
        map((res) => {
          return res.playlists;
        })
      );
  }

  getUserFavouriteArtists() {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<SpotifyApi.MultipleCategoriesResponse>(
      `https://api.spotify.com/v1/me/following?type=artist`,
      {
        headers
      }
    );
  }

  searchForAnItem(term: string) {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const params = new HttpParams()
      .set('q', term)
      .set('type', 'album,artist,playlist,track,show,episode');
    const httpOptions = {
      headers: headers,
      params: params
    };
    if (term === '') {
      return of([]);
    }
    return this.http.get(this.search, httpOptions);
  }

  searchOtherResult(value: string) {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get(value, { headers }).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }

  getUse() {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    this.http
      .get<any>('https://api.spotify.com/v1/me', { headers })
      .subscribe((res) => res);
  }

  getUserPlaylists() {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const userId = '2gwf4f6zz8ginkw7v9v3e3tmx';

    return this.http.get(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers
      }
    );
  }

  getPlaylistsItems(playlist_id: string) {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers
      }
    );
  }

  addItemToPlaylist(playlistId: string, itemUri: string) {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const params = {
      uris: [itemUri]
    };

    return this.http
      .post<any>(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks/`,
        params,
        { headers }
      )
      .subscribe((res) => {
        console.log('ADDiTEM =', res);
      });
  }

  removePlaylistItem(
    playlist_id: string | undefined,
    trackUri: string | undefined,
    playlistSnapShotId: string | undefined
  ) {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);
    console.log(
      'playlistId  is =' +
        playlist_id +
        '   trackUri  is= ' +
        trackUri +
        'snapshotId =' +
        playlistSnapShotId
    );
    const params = {
      tracks: [{ uri: trackUri }],
      snapshot_id: playlistSnapShotId
    };

    const options = {
      headers: headers,
      body: params
    };

    return this.http
      .delete(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        options
      )
      .subscribe((res) => {
        return res;
      });
  }

  createPlaylist(playlistName: string, playlistDescription: string) {
    const accessToken = localStorage.getItem('access_token');
    const userPlaylistId = '2gwf4f6zz8ginkw7v9v3e3tmx';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const postData = {
      name: playlistName,
      description: playlistDescription,
      public: false
    };

    const body = JSON.stringify(postData);

    return this.http
      .post(
        `https://api.spotify.com/v1/users/${userPlaylistId}/playlists`,
        body,
        { headers }
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  deletePlaylistItem(id: string) {
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http
      .delete(`https://api.spotify.com/v1/playlists/${id}/followers`, {
        headers
      })
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }
  // stay to fix some issues on this method below
  getPlaylistCoverImage(playlistId: string, url: string) {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const postData = btoa(url);
    console.log(postData);

    return this.http
      .put(
        `https://api.spotify.com/v1/playlists/${playlistId}/images`,
        postData,
        {
          headers
        }
      )
      .pipe(
        map((res) => {
          console.log('getPlaylistCoverImage =', res);
          return res;
        })
      );
  }
}
