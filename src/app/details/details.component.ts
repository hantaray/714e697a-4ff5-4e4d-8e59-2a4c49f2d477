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
  template: `
  <article class="article">
  <div class="content">
    <section class="listing-description">
      <h1 class="listing-heading">{{singleEvent?.title}}</h1>
      <p class="listing-location">{{singleEvent?.city}}, {{singleEvent?.country}}</p>
      <ul>
        <li class="listing-text"><a href="{{ singleEvent?.venue?.direction }}" target="_blank"><mat-icon> location_on</mat-icon> {{ singleEvent?.venue?.name }}</a></li>
        <li class="listing-text">Starts: {{ singleEvent?.startTime | date: 'dd.MM.yyyy hh:mm:ss' }}</li>
        <li class="listing-text">Ends: {{ singleEvent?.endTime | date: 'dd.MM.yyyy hh:mm:ss' }}</li>
        <li class="listing-text">Attending people: {{ singleEvent?.attending }}</li>
        <li class="listing-text">Private event?: {{ singleEvent?.private }}</li>
        <li class="listing-text">Artists:</li>
        <ul>
          <li class="listing-text" *ngFor="let artist of singleEvent?.artists">{{ artist.name }}</li>
        </ul>
        <button class="addCartBtn" (click)="addToCart()">+</button>
      </ul>
    </section>
  </div>
  <div class="image-container">
    <img class="listing-flyer" [src]="singleEvent?.flyerFront" alt="Flyer image of {{singleEvent?.flyerFront}}" />
  </div>
</article>

`,
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
