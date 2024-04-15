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
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from '../app.component';

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
    MatSelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})

export class HomeComponent {
  eventDate: Date = new Date;
  eventsService: EventsService = inject(EventsService);

  singleEventList: SingleEvent[] = [];
  static filteredEventsList: SingleEvent[] = [];

  displayedDate: Date | null = null;

  static selectedCity: string = 'london';

  constructor() {
    this.getEventsByCity(HomeComponent.selectedCity);
    // Listen to scroll event to update displayed date
    window.addEventListener('scroll', this.updateDisplayedDate.bind(this));
  }

  get filteredEventsList() { return HomeComponent.filteredEventsList; }
  get selectedCity() { return HomeComponent.selectedCity; }
  set selectedCity(value: string) { HomeComponent.selectedCity = value; }

  getEventsByCity(city: string) {
    // Fetching all events from the service
    this.eventsService.getAllEvents(city).then((singleEventList: SingleEvent[]) => {
      this.singleEventList = singleEventList;
      HomeComponent.filteredEventsList = singleEventList;
      // Sort the events by date
      HomeComponent.filteredEventsList = this.filteredEventsList.sort((a, b) => (a.date < b.date ? -1 : 1));
      // Set the initial displayed date
      if (this.filteredEventsList.length > 0) {
        this.displayedDate = this.filteredEventsList[0].date;
      }
    });
  }

  // Filter events based on search input
  filterResults(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    if (!value) {
      // Clear filter, include events from singleEventList that are not in the cart
      HomeComponent.filteredEventsList = this.singleEventList.filter(event =>
        !AppComponent.eventsInCartList.includes(event)
      );
      return;
    }

    HomeComponent.filteredEventsList = this.singleEventList.filter(event =>
      event.title.toLowerCase().includes(value) && !AppComponent.eventsInCartList.includes(event)
    );
  }

  // Add event to the cart
  addToCart(event: SingleEvent) {
    AppComponent.addToCart(event);
    // Remove event from filteredEventsList
    HomeComponent.filteredEventsList = this.filteredEventsList.filter((e) => e._id !== event._id);
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
