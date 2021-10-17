import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GlobalService {
  constructor(private http: HttpClient) {}

  public getQuery(query: string) {
    const url: string = `https://api.spotify.com/v1/${query}`;
    const access_token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${access_token}`
    });

    return this.http.get(url, { headers });
  }
}
