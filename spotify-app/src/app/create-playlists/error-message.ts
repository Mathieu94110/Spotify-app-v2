import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.html',
  styles: [
    `
      .message {
        color: red;
        font-weight: 600;
      }
    `
  ]
})
export class ErrorMessageComponent {}
