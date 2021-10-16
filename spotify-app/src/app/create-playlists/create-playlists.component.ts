import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpotifyServices } from '../services/spotify-services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from './error-message';
import { SpotifyApi } from '../models/@types';

@Component({
  selector: 'app-create-playlists',
  templateUrl: './create-playlists.component.html',
  styleUrls: ['./create-playlists.component.scss']
})
export class CreatePlaylistsComponent implements OnInit {
  create: boolean = false;
  playlistForm!: FormGroup;
  name!: string;
  description!: string;
  returnedPlaylist!: SpotifyApi.IReturnedPLaylist | null;
  playlistArray: SpotifyApi.IReturnedPLaylist[] = [];
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
    if (!localStorage.getItem('playlistArray')) {
      localStorage.setItem('playlistArray', JSON.stringify(this.playlistArray));
    }
    localStorage.setItem('playlists', JSON.stringify(this.returnedPlaylist));
    console.log('HERE', this.returnedPlaylist);
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
  setToLocalStorage() {
    const playlistnotExist = !this.playlistArray.some(
      (p) => p.id === this.returnedPlaylist!.id
    );

    playlistnotExist
      ? this.playlistArray.push(this.returnedPlaylist!)
      : this.openSnackBar();

    localStorage.setItem('playlistArray', JSON.stringify(this.playlistArray));
  }
  openSnackBar() {
    this.snackBar.openFromComponent(ErrorMessageComponent, {
      duration: 2000
    });
  }

  remove() {
    this.returnedPlaylist = null;
  }
}
