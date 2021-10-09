import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'songs', component: SongsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
