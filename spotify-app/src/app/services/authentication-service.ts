import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SpotifyServices } from './spotify-services';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private spotifyServices: SpotifyServices) {}
  public requestDataFromMultipleSources(): Observable<any[]> {
    let login = this.spotifyServices.login();
    let getTokens = this.spotifyServices.getToken();
    return forkJoin([login, getTokens]);
  }
}
