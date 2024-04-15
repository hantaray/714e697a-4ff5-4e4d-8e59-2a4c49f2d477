import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SingleEvent } from './single-event';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, MatMenuModule, MatIconModule, MatListModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'events';
  static cartContentCount: number = 0;
  // cartContentCount: number = 0;
  static filteredEventsList: SingleEvent[] = [];
  static eventsInCartList: SingleEvent[] = [];

  get cartContentCount() {
    return AppComponent.cartContentCount;
  }

  get eventsInCartList() {
    return AppComponent.eventsInCartList;
  }

  static addToCart(event: SingleEvent) {
    // Add event to the cart if it's not already there
    if (AppComponent.eventsInCartList.indexOf(event) === -1) {
      AppComponent.eventsInCartList.push(event);
    }
    // Update the count of items in the cart
    AppComponent.cartContentCount = AppComponent.eventsInCartList.length;
  }

  removeFromCart(event: SingleEvent) {
    AppComponent.eventsInCartList = this.eventsInCartList.filter((e) => e._id !== event._id);
    AppComponent.filteredEventsList.push(event);
    // Sort the events by date
    AppComponent.filteredEventsList = AppComponent.filteredEventsList.sort((a, b) => (a.date < b.date ? -1 : 1));

    // Update the count of items in the cart
    AppComponent.cartContentCount = AppComponent.eventsInCartList.length;

    HomeComponent.filteredEventsList.push(event);
    // Sort the events by date
    HomeComponent.filteredEventsList = HomeComponent.filteredEventsList.sort((a, b) => (a.date < b.date ? -1 : 1));
  }
}
