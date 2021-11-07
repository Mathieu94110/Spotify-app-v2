import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@Injectable()
export class AppComponent implements OnInit {
  interval: number = 60 * 60 * 1000;
  timer?: number;
  constructor(private router: Router) {}

  ngOnInit() {
    this.timer = window.setInterval(
      () => this.router.navigate(['/login']),
      this.interval
    );
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
