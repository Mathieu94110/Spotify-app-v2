import { Component, OnInit } from '@angular/core';
import { spotifyServices } from '../services/spotify_services';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(private spotifyServices: spotifyServices) {}
  ngOnInit(): void {
    this.spotifyServices.getToken();
  }
}
