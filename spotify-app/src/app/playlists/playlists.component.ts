import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpotifyServices } from '../services/spotify-services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from './error-message';

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
  index: number;
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
  playlistArray: IReturnedPLaylist[] = [];
  tracksItem: string[] = [];
  playlistIsExisting: boolean = false;

  constructor(
    public fb: FormBuilder,
    private spotifyService: SpotifyServices,
    private snackBar: MatSnackBar
  ) {}

  reactiveForm() {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.reactiveForm();
    localStorage.setItem('playlists', JSON.stringify(this.returnedPlaylist));
    console.log('HERE', this.returnedPlaylist);
    console.log(this.playlistArray);
  }

  submitPlaylist(): any {
    if (this.playlistForm != undefined && this.playlistForm.valid) {
      this.spotifyService
        .createPlaylist(this.playlistName, this.playlistDescription)
        .subscribe(
          (res: any) => {
            this.returnedPlaylist = res;
            console.log(res);
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
  setToLocalStorage() {
    const playlistnotExist = !this.playlistArray.some(
      (p) => p.id === this.returnedPlaylist.id
    );

    playlistnotExist
      ? this.playlistArray.push(this.returnedPlaylist)
      : this.openSnackBar();

    console.log(this.playlistArray);
  }
  openSnackBar() {
    this.snackBar.openFromComponent(ErrorMessageComponent, {
      duration: 2000
    });
  }

  remove() {}
}
