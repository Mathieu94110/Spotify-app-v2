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
  returnedPlaylist!: SpotifyApi.IReturnedPLaylist;
  playlistId: string | undefined;
  // playlistArray: SpotifyApi.IReturnedPLaylist[] = [];
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
  }

  submitPlaylist(): any {
    if (this.playlistForm != undefined && this.playlistForm.valid) {
      this.spotifyService
        .createPlaylist(this.playlistName, this.playlistDescription)
        .subscribe(
          (res: any) => {
            this.returnedPlaylist = res;
            this.playlistId = res.id;
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

  getUserPlaylists() {
    this.spotifyService.getUserPlaylists();
  }

  addItems() {
    this.spotifyService.addItemToPlaylist();
  }

  setToLocalStorage() {
    let playlistsData: SpotifyApi.IReturnedPLaylist[] | null = JSON.parse(
      localStorage.getItem('playlistArray') || '{}'
    );
    if (playlistsData == null) playlistsData = [];

    localStorage.setItem('entry', JSON.stringify(this.returnedPlaylist));

    const playlistnotExist = !playlistsData.some(
      (p) => p.id === this.returnedPlaylist!.id
    );

    playlistnotExist
      ? playlistsData.push(this.returnedPlaylist)
      : this.openSnackBar();

    localStorage.setItem('playlistArray', JSON.stringify(playlistsData));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(ErrorMessageComponent, {
      duration: 2000
    });
  }

  remove(element: any) {
    this.returnedPlaylist = element;
    element.remove();
  }
}
