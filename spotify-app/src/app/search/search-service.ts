import { Injectable } from '@angular/core';
import { GlobalService } from '../services/global-services';

// Models
import { APISearch } from '../models/search-model';

@Injectable() // service provided in module
  
export class SearchService {
  constructor(private globalService: GlobalService) {
    /*empty*/
  }



  searchForAnItem(term: string) {
    let accessToken = localStorage.getItem('access_token');
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const params = new HttpParams()
      .set('q', term)
      .set('type', 'album,artist,playlist,track,show,episode');
    const httpOptions = {
      headers: headers,
      params: params,
    };
    if (term === '') {
      return of([]);
    }
    return this.http.get(this.search, httpOptions);
  }
}