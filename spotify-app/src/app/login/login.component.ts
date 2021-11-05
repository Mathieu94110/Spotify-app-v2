import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';
import { SpotifyServices } from '../services/spotify-services';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl = '';
  error = '';
  responseData1: any;
  responseData2: any;

  constructor(
    public authenticationService: AuthenticationService,
    public spotifyService: SpotifyServices
  ) {}

  ngOnInit() {}

  started() {
    // this.spotifyService.login();
    //  this.spotifyService.getToken();
this.authenticationService
   .requestDataFromMultipleSources()
  .subscribe((responseList: any) => {
    this.responseData1 = responseList[0];
  this.responseData2 = responseList[1];
  }); 
  }
}
