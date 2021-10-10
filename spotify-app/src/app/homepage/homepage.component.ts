import { Component } from '@angular/core';
import { SpotifyServices } from '../services/spotify-services';
import { FormControl } from '@angular/forms';
import { BrowseApiService } from '../services/browse-api-services';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  constructor(
    private spotifyServices: SpotifyServices,
    private browseApiService: BrowseApiService,
    private router: Router
  ) {
    // this.stateUser = this.spotifyServices.checkToken();
    // if (this.stateUser) {
    //   this.startComponent();
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

  featuredPlaylists = {
    message: '',
    image: '',
    description: '',
    previous: '',
    next: ''
  };
  allCategories = { name: '', icon: '', id: '', previous: '', next: '' };
  AllNewReleases = {
    name: '',
    release_date: '',
    artist_name: '',
    image: '',
    previous: '',
    next: ''
  };
  searchControl = new FormControl();
  subject = new Subject<any>();
  initialFeaturedValue: string = `https://api.spotify.com/v1/browse/featured-playlists?country=FR&limit=2`;
  initialCategoriesValue: string = `https://api.spotify.com/v1/browse/categories?country=FR&limit=2`;
  initialNewReleaseValues: string = `https://api.spotify.com/v1/browse/new-releases?country=FR&limit=2`;
  // stateUser: boolean;

  ngOnInit() {
    this.spotifyServices.getToken();
  }

  ngAfterContentInit() {
    this.browseApiService.getAllCategories();
    this.browseApiService.getCategoryPlaylists('party');
    this.browseApiService.getAllFeaturedPlaylists();

    this.spotifyServices
      .getFeaturedPlaylists(this.initialFeaturedValue)
      .subscribe((res: any) => {
        // Object.assign(this.featuredPlaylists, res);
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
        //  Object.assign(this.allCategories, res);
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
        //Object.assign(this.AllNewReleases, res);
        this.AllNewReleases.name = res.albums.items[0].name;
        this.AllNewReleases.release_date =
          res.albums.items[0].name.release_date;
        this.AllNewReleases.artist_name = res.albums.items[0].artists[0].name;
        this.AllNewReleases.image = res.albums.items[0].images[0].url;
        this.AllNewReleases.previous = res.albums.previous;
        this.AllNewReleases.next = res.albums.next;
      });
  }
  getPreviousFeaturedList(value: string) {
    this.spotifyServices.getFeaturedPlaylists(value).subscribe((res: any) => {
      //     Object.assign(this.featuredPlaylists, res);
      this.featuredPlaylists.image = res.playlists.items[0].images[0].url;
      this.featuredPlaylists.message = res.message;
      this.featuredPlaylists.description = res.playlists.items[0].description;
      this.featuredPlaylists.previous =
        res.playlists.previous === null ? '' : res.playlists.previous;
      this.featuredPlaylists.next =
        res.playlists.next === null ? '' : res.playlists.next;
    });
  }
  getNextFeaturedList(value: string) {
    this.spotifyServices.getFeaturedPlaylists(value).subscribe((res: any) => {
      //Object.assign(this.featuredPlaylists, res);
      this.featuredPlaylists.image = res.playlists.items[0].images[0].url;
      this.featuredPlaylists.message = res.message;
      this.featuredPlaylists.description = res.playlists.items[0].description;
      this.featuredPlaylists.previous =
        res.playlists.previous === null ? '' : res.playlists.previous;
      this.featuredPlaylists.next =
        res.playlists.next === null ? '' : res.playlists.next;
    });
  }
  getPreviousAllCategories(value: string) {
    this.spotifyServices.getAllCategories(value).subscribe((res: any) => {
      //    Object.assign(this.allCategories, res);
      this.allCategories.name = res.categories.items[0].name;
      this.allCategories.icon = res.categories.items[0].icons[0].url;
      this.allCategories.id = res.categories.items[0].id;
      this.allCategories.previous =
        res.categories.previous === null ? '' : res.categories.previous;
      this.allCategories.next =
        res.categories.next === null ? '' : res.categories.next;
    });
  }
  getNextAllCategories(value: string) {
    this.spotifyServices.getAllCategories(value).subscribe((res: any) => {
      //  Object.assign(this.allCategories, res);
      this.allCategories.name = res.categories.items[0].name;
      this.allCategories.icon = res.categories.items[0].icons[0].url;
      this.allCategories.id = res.categories.items[0].id;
      this.allCategories.previous =
        res.categories.previous === null ? '' : res.categories.previous;
      this.allCategories.next =
        res.categories.next === null ? '' : res.categories.next;
    });
  }
  getNextAllNewReleases(value: string) {
    this.spotifyServices.getAllNewReleases(value).subscribe((res: any) => {
      //  Object.assign(this.AllNewReleases, res);
      this.AllNewReleases.name = res.albums.items[0].name;
      this.AllNewReleases.release_date = res.albums.items[0].name.release_date;
      this.AllNewReleases.artist_name = res.albums.items[0].artists[0].name;
      this.AllNewReleases.image = res.albums.items[0].images[0].url;
      this.AllNewReleases.previous =
        res.albums.previous === null ? '' : res.albums.previous;
      this.AllNewReleases.next =
        res.albums.next === null ? '' : res.albums.next;
    });
  }
  getPreviousAllNewReleases(value: string) {
    this.spotifyServices.getAllNewReleases(value).subscribe((res: any) => {
      // Object.assign(this.AllNewReleases, res);
      this.AllNewReleases.name = res.albums.items[0].name;
      this.AllNewReleases.release_date = res.albums.items[0].name.release_date;
      this.AllNewReleases.artist_name = res.albums.items[0].artists[0].name;
      this.AllNewReleases.image = res.albums.items[0].images[0].url;
      this.AllNewReleases.previous =
        res.albums.previous === null ? '' : res.albums.previous;
      this.AllNewReleases.next =
        res.albums.next === null ? '' : res.albums.next;
    });
  }
}
// handleLoginTwo() {
//   this.spotifyServices.getrefreshToken();
//  }

// Create after InitialGetToken()
//let decodedToken = localStorage.getItem('access_token');
// if (decodedToken.exp < new Date().getTime() / 1000) {
//   console.log('EXPIRED');
//   call getToken("refresh_token")
// }
// let date = new Date();
// // date.getTime() is in milliseconds and thus we've got to divide by 1000
// if (decodedToken.exp < date.getTime() / 1000) {
//   console.log('The token has expired');
// } else {
//   console.log('The token is still valid');
// }
