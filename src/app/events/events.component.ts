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
  template: `
  <section class="listing">
    <!-- Display event title -->
    <h2 class="listing-heading">{{ singleEvent.title }}</h2>
    <!-- Display event flyer -->
    <img class="listing-photo" [src]="singleEvent.flyerFront" alt="Exterior photo of {{singleEvent.flyerFront}}">
    <!-- Display venue name and link to its location -->
    <a href="{{ singleEvent.venue.direction}}" target="_blank"><mat-icon> location_on</mat-icon> {{ singleEvent.venue.name}}</a>
    <!-- Display event start time -->
    <p class="listing-time">Starts: {{singleEvent.startTime | date: 'dd.MM.yyyy hh:mm:ss'}}</p>
    <!-- Display event end time -->
    <p class="listing-time">Ends: {{singleEvent.endTime | date: 'dd.MM.yyyy hh:mm:ss'}}</p>
    <!-- Link to show event details -->
    <a [routerLink]="['details', singleEvent._id]">Show event</a>
    <!-- Button to add event to cart -->
    <button class="addCartBtn" (click)="addToCart(singleEvent)">+</button>
  </section>
  `,
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
