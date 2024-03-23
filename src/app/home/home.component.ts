import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsComponent } from '../events/events.component'
import { SingleEvent } from '../single-event';
import { EventsService } from '../events.service'
import { CartComponent } from '../cart/cart.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    EventsComponent,
    CartComponent,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
  ],
  template: `
    <!-- Toolbar with search input and shopping cart -->
    <div class="toolbar">
      <input type="text" placeholder="Search..." (input)="filterResults($event)">
      <div class="menu-button">
        <button class="shopping-cart-button" mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>shopping_cart</mat-icon>
          <!-- Display the count of items in the cart -->
          <span class='badge badge-warning' id='lblCartCount' *ngIf="cartContentCount > 0">{{cartContentCount}}</span>
        </button>
        <!-- Shopping cart menu -->
        <mat-menu #menu="matMenu">
          <h2 class="cart">Your events:</h2>
          <p class="cart" *ngIf="cartContentCount == 0">There are no events in your cart</p>
          <!-- Display events in the cart -->
          <mat-list class="cart" role="list" *ngFor="let singleEvent of eventsInCartList">
            <p>{{singleEvent.title}}</p>
          </mat-list>
        </mat-menu>
      </div>
    </div>

    <!-- Display the currently selected date -->
    <div class="sticky-date">
      <h2>{{ displayedDate | date: 'dd.MM.yyyy' }}</h2>
    </div>

    <!-- Section to display events -->
    <section class="results">
      <!-- Loop through filtered events and display them -->
      <div *ngFor="let singleEvent of filteredEventsList" class="event" [attr.data-date]="singleEvent.date">
        <app-events [singleEvent]="singleEvent" (addToCartClicked)="addToCart(singleEvent)"></app-events>
      </div>
    </section>
  `,
  styleUrl: './home.component.sass'
})

export class HomeComponent {
  eventDate: Date = new Date;
  eventsService: EventsService = inject(EventsService);

  singleEventList: SingleEvent[] = [];
  filteredEventsList: SingleEvent[] = [];
  eventsInCartList: SingleEvent[] = [];
  cartContentCount: number = 0;

  displayedDate: Date | null = null;

  constructor() {
    // Fetching all events from the service
    this.eventsService.getAllEvents().then((singleEventList: SingleEvent[]) => {
      this.singleEventList = singleEventList;
      this.filteredEventsList = singleEventList;
      // Sort the events by date
      this.filteredEventsList = this.filteredEventsList.sort((a, b) => (a.date < b.date ? -1 : 1));
      // Set the initial displayed date
      if (this.filteredEventsList.length > 0) {
        this.displayedDate = this.filteredEventsList[0].date;
      }
    });
    // Listen to scroll event to update displayed date
    window.addEventListener('scroll', this.updateDisplayedDate.bind(this));
  }

  // Filter events based on search input
  filterResults(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    if (!value) {
      // Clear filter, include events from singleEventList that are not in the cart
      this.filteredEventsList = this.singleEventList.filter(event =>
        !this.eventsInCartList.includes(event)
      );
      return;
    }

    this.filteredEventsList = this.singleEventList.filter(event =>
      event.title.toLowerCase().includes(value) && !this.eventsInCartList.includes(event)
    );
  }

  // Add event to the cart
  addToCart(event: SingleEvent) {
    // Add event to the cart if it's not already there
    if (this.eventsInCartList.indexOf(event) === -1) {
      this.eventsInCartList.push(event);
    }
    // Remove event from filteredEventsList
    this.filteredEventsList = this.filteredEventsList.filter((e) => e._id !== event._id);
    console.log('filteredEventsList', this.filteredEventsList.length)
    // Update the count of items in the cart
    this.cartContentCount = this.eventsInCartList.length;
  }

  // Update the displayed date based on scroll position
  updateDisplayedDate() {
    const events = document.querySelectorAll('.event');
    const scrollPosition = window.scrollY;

    for (let i = events.length - 1; i >= 0; i--) {
      const event = events[i] as HTMLElement;
      const rect = event.getBoundingClientRect();

      if (rect.top <= 80) {
        const date = new Date(event.dataset['date'] || '');
        this.displayedDate = date;
        break;
      }
    }
  }
}
