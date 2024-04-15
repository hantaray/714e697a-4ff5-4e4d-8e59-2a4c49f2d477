import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SingleEvent } from '../single-event';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.sass'
})
export class EventsComponent {
  @Input() singleEvent!: SingleEvent; // Input property to receive single event data
  constructor(public dialog: MatDialog) { } // MatDialog injection for displaying dialogs

  addToCart(eventId: SingleEvent) {
    // this.addToCartClicked.emit(); // Emit event when adding to cart button is clicked
    AppComponent.addToCart(eventId);
  }
}
