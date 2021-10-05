import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { spotifyServices } from './services/spotify_services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomepageComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [spotifyServices],
  bootstrap: [AppComponent]
})
export class AppModule {}
