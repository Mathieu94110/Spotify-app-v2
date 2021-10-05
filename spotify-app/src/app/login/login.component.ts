import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';

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

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}

  started() {
    this.authenticationService
      .requestDataFromMultipleSources()
      .subscribe((responseList: any) => {
        this.responseData1 = responseList[0];
        this.responseData2 = responseList[1];
      });
  }
}