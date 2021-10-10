import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpotifyServices } from '../services/spotify-services';

interface IReturnedPLaylist {
  name: string;
  description: string;
  id: number;
  snapshot_id: string;
  owner: {
    uri: string;
  };
  tracks: {
    items: any;
  };
}

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  create: boolean = false;
  playlistForm!: FormGroup;
  name!: string;
  description!: string;
  returnedPlaylist!: IReturnedPLaylist;
  tracksItem: string[] = [];

  constructor(
    public fb: FormBuilder,
    private spotifyService: SpotifyServices
  ) {}

  reactiveForm() {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.reactiveForm();
  }

  submitPlaylist(): any {
    if (this.playlistForm != undefined && this.playlistForm.valid) {
      this.spotifyService
        .createPlaylist(this.playlistName, this.playlistDescription)
        .subscribe(
          (res: any) => {
            this.returnedPlaylist = res;
          },
          (err: Error) => {
            console.error(err);
          }
        );
    }
  }
  get playlistName() {
    return this.playlistForm.get('name')?.value;
  }
  get playlistDescription() {
    return this.playlistForm.get('description')?.value;
  }
  createAction() {
    this.create = !this.create;
  }
  getUserInfo() {
    this.spotifyService.getUse();
  }

  getPLaylists() {
    this.spotifyService.getUserPlaylists();
  }

  addItems() {
    this.spotifyService.addItemToPlaylist();
  }
}
