import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SingleEvent } from '../single-event';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

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

  addToCart(event: SingleEvent) {
    AppComponent.addToCart(event);
    // Remove event from filteredEventsList
    HomeComponent.filteredEventsList = HomeComponent.filteredEventsList.filter((e) => e._id !== event._id);
  }
}
