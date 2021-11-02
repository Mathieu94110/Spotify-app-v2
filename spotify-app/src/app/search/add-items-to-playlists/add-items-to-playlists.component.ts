import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAddToPlaylistsComponent } from './pop-up-add-to-playlists/pop-up-add-to-playlists.component';
@Component({
  selector: 'app-add-items-to-playlists',
  templateUrl: './add-items-to-playlists.component.html',
  styleUrls: ['./add-items-to-playlists.component.scss']
})
export class AddItemsToPlaylistsComponent {
  @Input() selectedId: string | undefined;

  @Input() selectedUri: string | undefined;

  constructor(public dialog: MatDialog) {}

  openDialog(selectedId: string | undefined) {
    const dialogRef = this.dialog.open(PopUpAddToPlaylistsComponent, {
      data: {
        id: selectedId,
        uri: this.selectedUri
      }
    });
    console.log('from child dialog :', selectedId);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    return dialogRef;
  }
}
