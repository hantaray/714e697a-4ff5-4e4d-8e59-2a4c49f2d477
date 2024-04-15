import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { EventsService } from '../events.service';
import { SingleEvent } from '../single-event';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule, AppComponent, HomeComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.sass'
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  eventsService = inject(EventsService);
  singleEvent: SingleEvent | undefined;

  constructor() {
    const eventId = parseInt(this.route.snapshot.params['id'], 10);
    this.eventsService.getEventById(HomeComponent.selectedCity, eventId.toString()).then(singleEvent => {
      if (singleEvent) {
        this.singleEvent = singleEvent;
      } else {
        console.log(`Event with ID ${eventId} not found.`);
      }
    });
  }

  // Add event to the cart
  addToCart() {
    console.log('event', this.singleEvent);
    // AppComponent.addToCart(this.singleEvent);
    // Remove event from filteredEventsList
    // HomeComponent.filteredEventsList = this.filteredEventsList.filter((e) => e._id !== event._id);
  }
}
