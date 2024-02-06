import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';

import { SingleEvent } from '../single-event';

@Component({
  selector: 'app-cart',
  template: `
  <mat-dialog-content>
    <h2>Title: {{ data.title }}</h2>
  </mat-dialog-content>

  `,
  standalone: true,
  imports: [MatDialogContent],
})
export class CartComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SingleEvent) { }
}
